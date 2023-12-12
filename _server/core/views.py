from django.shortcuts import render, redirect
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms import model_to_dict
from django.http import HttpRequest, HttpResponse
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
            warrenty_expiration = body["warrenty_expiration"],
            cost_of_reimbursement = body["cost_of_reimbursement"]
        )
    except:
        return JsonResponse({'message': "Didn't enter in the correct data"})
    
    patient.save()
    return JsonResponse({"success": True})

@login_required
def edit_patient(req: HttpRequest, id):
    try:
        patient = Patient.objects.get(id=id)
    except Exception:
        return JsonResponse({"message": "Couldn't find that patient in our system."})

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
        return JsonResponse({"message": "Deleted Patient Successfully"})
    except:
        return JsonResponse({"message": "Couldn't find Patient"})

@login_required #possbily move this to a ReactRouter
def get_patient(req: HttpRequest):
    # exmaple code from lecture
    notes = req.user.note_set.all()
    notes_dict = [model_to_dict(note) for note in notes] # fancy code that joseph pulled on us in class. Basically, this is a map function from js
    

@login_required
# Get all users
def all_patients(req: HttpRequest):
    all_patients = Patient.objects.get()
    patient_view_data = [model_to_dict(patient, fields=['id', 'name', 'address', 'email']) for patient in all_patients]
        
    return JsonResponse({'patients': patient_view_data})

# demo code 
# def json_note_demo(req):
    # body = json.loads(req.body)
    
    # model = Model(
    #     title = body["title"],
    #     content = body["content"],
    #     user = req.user
    #     ) # temp code
    
    # return ({"note": model_to_dict(model)})

# possbily create helper function to create logs per request made on the serve