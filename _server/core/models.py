from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Patient(models.Model):
    
    name = models.CharField(max_length=100)
    address = models.TextField()
    birthday = models.DateTimeField()
    phone_number = models.CharField(max_length=10)
    primary_insurance = models.TextField()
    secondary_insurance = models.TextField()
    date_of_fitting = models.DateTimeField()
    warranty_expiration = models.DateTimeField()
    cost_of_reimbursement = models.IntegerField()
    
class Log(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=255)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    
