from django.urls import path
from . import views
from registration import views as coreviews

urlpatterns = [
    path('', view=coreviews.sign_in, name="register"),
    path("central", view=views.index, name="index"),
    path('create_patient', view=views.add_patient, name="create_patient"),
    path('patient/<int:id>', view=views.get_patient, name="get_patient"),
    path('edit_patient/<int:id>', view=views.edit_patient, name='edit_patient'),
    path('delete_patient/<int:id>', view=views.delete_patient, name='delete_patient'),
    path('all_patients', view=views.all_patients, name="all_patients"),
    path('user', view=views.get_current_user, name="user"),
    path('logout', view=coreviews.logout_view, name="logout"),
    path('all_logs', view=views.all_logs, name='all_logs'),
    path('print_log/int:id>', view=views.print_log, name='print_log')
]