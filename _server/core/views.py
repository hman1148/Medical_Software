import json
import os
from django.shortcuts import render
from django.conf  import settings
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms import model_to_dict
from django.http import HttpRequest, FileResponse
from .models import Log, Patient
from .reportgen import create_report
from .excel_importer import process_excel_file


# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
        context = {
            "asset_url": os.environ.get("ASSET_URL", ""),
            "debug": settings.DEBUG,
            "manifest": MANIFEST,
            "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
            "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0],
            "only_signup": True
        }
        
        return render(req, "core/index.html", context)

@login_required
def add_patient(req: HttpRequest):
    body = json.loads(req.body)
    
    try:
        patient = Patient(
            name = body["name"],
            address = body["address"],
            email = body["email"],
            birthday = body["birthday"],
            phone_number = body["phone_number"],
            primary_insurance = body["primary_insurance"],
            secondary_insurance = body["secondary_insurance"],
            date_of_fitting = body["date_of_fitting"],
            warranty_expiration = body["warranty_expiration"],
            cost_of_hearing_aid = body["cost_of_hearing_aid"]
        )
        
    except Exception as e:
        return JsonResponse({'message': f"Didn't enter in the correct data {e}"})
    
    patient.save()
    log_entry = Log(user=req.user, action_type="Created Patient", patient=patient)

    log_entry.save()

    return JsonResponse({"message": "success"})

#----------------
#Edit patient page
#---------------

@login_required
def edit_patient(req: HttpRequest, id):
    body = json.loads(req.body)
    
    try:
        patient = Patient.objects.get(id=id)
        
        patient.name = body["name"]
        patient.address = body["address"]
        patient.birthday = body["birthday"]
        patient.phone_number = body["phone_number"]
        patient.primary_insurance = body["primary_insurance"]
        patient.secondary_insurance = body["secondary_insurance"]
        patient.date_of_fitting = body["date_of_fitting"]
        patient.warrenty_expiration = body["warranty_expiration"]
        patient.cost_of_hearing_aid = body["cost_of_hearing_aid"]
        
        patient.save()
        
        log_entry = Log(user=req.user, action_type="Edited Patient", patient=patient)
        log_entry.save()
        
        return JsonResponse({"message": "success"})

    except Exception as e:
        return JsonResponse({"message": f"Couldn't find that patient in our system. {e}"})

   

@login_required
def delete_patient(req: HttpRequest, id):
    try:
        deleted_patient = Patient.objects.get(id=id)
        
        log_entry = Log(user=req.user, action_type="Deleted Patient", patient=deleted_patient)
        log_entry.save()
        
        deleted_patient.delete()
        
        return JsonResponse({"message": "success"})
    except Exception as e:
        return JsonResponse({"message": f"Couldn't find Patient {e}"})

@login_required
def get_patient(req: HttpRequest, id):
    try:
        patient = Patient.objects.get(id=id)
        patient_data = model_to_dict(patient)
        return JsonResponse({"patient": patient_data})
    except Exception as e:
        return JsonResponse({"message": f"Couldn't find patient {e}"})
    
    
@login_required
def all_patients(req: HttpRequest):
    search_query = req.GET.get('search', '')
    page_number = req.GET.get('page', 1)
    
    querry_set = Patient.objects.all()
    
    if search_query:
        querry_set = querry_set.filter(name__icontains=search_query) # name_icontains looks for the 'name' it can be 'email_icontains' for example
    
    paginator = Paginator(querry_set, 10)
    page_obj = paginator.get_page(page_number)


    patient_view_data = [model_to_dict(patient, fields=['id', 'name', 'address', 'email']) for patient in page_obj]
        
    return JsonResponse({'patients': patient_view_data, 'page': page_obj.number, 'total_pages': paginator.num_pages})


@login_required
def get_current_user(req: HttpRequest):
    current_user = req.user
    
    if current_user.is_authenticated:
        user_view_info = model_to_dict(current_user, fields=['username', 'email', 'first_name', 'last_name'])
        return JsonResponse({"user": user_view_info})
    else:
        return JsonResponse({"user": "none"})
    
#--------------------
# Logs Page
#--------------------
@login_required
def all_logs(req: HttpRequest):
    search_query = req.GET.get('search', '')
    page_number = req.GET.get('page', 1)
    
    querry_set = Log.objects.all()
    
    if querry_set:
        # search by users
        querry_set = querry_set.filter(user__first_name__icontains=search_query)
    
    paginator = Paginator(querry_set, 10)
    page_obj = paginator.get_page(page_number)
        
    # get specific attributes from the logs since the 
    # ids from the user and patient are only saved
    log_view_data = [
        {
            'id': log.id,
            'user': f"{log.user.first_name} {log.user.last_name}",  
            'action_type': log.action_type,
            'patient': log.patient.name,  
            'date': log.date
        }
        for log in page_obj
    ]
        
    return JsonResponse({'logs': log_view_data, 'page': page_obj.number, 'total_pages': paginator.num_pages})


#-----------------------
# Print Patient's report
#-----------------------
@login_required
def print_report(req: HttpRequest, id):
    try:
        patient = Patient.objects.get(id=id)
        pdf_path = create_report(patient)
        
        log_entry = Log(user=req.user, action_type=f"Downloaded {patient.name}'s report", patient=patient)
        
        log_entry.save()
        return FileResponse(open(pdf_path, 'rb'), as_attachment=True, filename=f"{patient.name}'s_report.pdf")
        
    except Exception as error:
        return JsonResponse({"message": f"{error}"})
        
    
#---------------------
# Read in Excel File
#---------------------
def import_patient(req: HttpRequest):
    
    # try and verify we have an excel file, then read in patient data
    try:
        excel_file = req.FILES.get('excel_file')
        
        if excel_file:            
            patient_data = process_excel_file(excel_file)

            # loop through patient data found in the form
            for patient in patient_data:
                newPatient = Patient(
                    name = patient["name"],
                    address = patient["address"],
                    email = patient["email"],
                    birthday = patient["birthday"],
                    phone_number = patient["phone_number"],
                    primary_insurance = patient["primary_insurance"],
                    secondary_insurance = patient["secondary_insurance"],
                    date_of_fitting = patient["date_of_fitting"],
                    warranty_expiration = patient["warranty_expiration"],
                    cost_of_hearing_aid = patient["cost_of_hearing_aid"]
                )
                newPatient.save()
        return JsonResponse({"message": "success"})
    
    except Exception as e:
        return JsonResponse({"error": f"Failed to import file {e}"})
        
    