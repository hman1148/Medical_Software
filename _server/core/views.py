from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms import model_to_dict
from django.http import HttpRequest
from .models import Log, Patient


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
#--------------------
# Logs Page
#--------------------
@login_required
def logs(req: HttpRequest):
    logs = Log.objects.all()
    
    return JsonResponse({'logs': model_to_dict(logs)})

@login_required
def add_patient(req: HttpRequest):
    body = json.loads(req.body)
    
    try:
        patient = Patient(
            name = body["name"],
            address = body["address"],
            birthday = body["birthday"],
            phone_number = body["phone_number"],
            primary_insurance = body["primary_insurance"],
            secondary_insurance = body["secondary_insurance"],
            date_of_fitting = body["date_of_fitting"],
            warranty_expiration = body["warranty_expiration"],
            cost_of_reimbursement = body["cost_of_reimbursement"]
        )
        
        
    except Exception as e:
        print(e)
        return JsonResponse({'message': f"Didn't enter in the correct data {e}"})
    
    patient.save()
    return JsonResponse({"message": "success"})

@login_required
def edit_patient(req: HttpRequest, id):
    try:
        patient = Patient.objects.get(id=id)
    except Exception as e:
        return JsonResponse({"message": f"Couldn't find that patient in our system. {e}"})

    patient.name = req.body["name"],
    patient.address = req.body["address"]
    patient.birthday = req.body["birthday"]
    patient.phone_number = req.body["phone_number"]
    patient.primary_insurance = req.body["primary_insurance"]
    patient.secondary_insurance = req.body["secondary_insurance"]
    patient.date_of_fitting = req.body["date_of_fitting"]
    patient.warrenty_expiration = req.body["warrenty_expiration"]
    patient.cost_of_reimbursement = req.body["cost_of_reimbursement"]
    
    patient.save()
    return JsonResponse({"message": "Patient saved successfully"})



@login_required
def delete_patient(req: HttpRequest, id):
    try:
        deleted_user = Patient.objects.get(id=id)
        deleted_user.delete()
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
    all_patients = Patient.objects.all()
    patient_view_data = [model_to_dict(patient, fields=['id', 'name', 'address', 'email']) for patient in all_patients]
        
    return JsonResponse({'patients': patient_view_data})

@login_required
def get_current_user(req: HttpRequest):
    current_user = req.user
    
    if current_user.is_authenticated:
        user_view_info = model_to_dict(current_user, fields=['username', 'email', 'first_name', 'last_name'])
        return JsonResponse({"user": user_view_info})
    else:
        return JsonResponse({"user": "none"})