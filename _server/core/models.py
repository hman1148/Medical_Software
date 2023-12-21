from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Patient(models.Model):
    
    name = models.CharField(max_length=100)
    email = models.EmailField(default='example@example.com')
    address = models.TextField()
    birthday = models.DateTimeField()
    phone_number = models.CharField(max_length=10)
    primary_insurance = models.TextField()
    secondary_insurance = models.TextField()
    date_of_fitting = models.DateTimeField()
    warranty_expiration = models.DateTimeField()
    cost_of_hearing_aid = models.IntegerField()
    
class Log(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=255)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    
