from django.urls import path
from . import views
from registration import views as coreviews

urlpatterns = [
    path('', view=coreviews.sign_in, name="register"),
    path("central", view=views.index, name="index"),
    path('create_patient', view=views.add_patient, name="create_patient"),
    path('edit_patient/<int:id>', view=views.edit_patient, name='edit_patient'),
    path('delete_patient/<int:id>', view=views.delete_patient, name='delete_patient'),
    path('view_logs',view=views.logs, name='logs'),
    path('all_patients', view=views.all_patients, name="all_patients")
]