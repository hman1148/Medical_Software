import requests
import os
import logging
from django.http import StreamingHttpResponse
from django.utils.deprecation import MiddlewareMixin
from .models import Log, Patient, User

logger = logging.getLogger(__name__)


class LogMiddleware(MiddlewareMixin):
    def proccess_view(self, req, view_func, view_args, view_kwargs):
        
        if req.user.is_authenticated:
            action_type = f"{req.method} {view_func.__name__}"
            patient_id = view_kwargs.get('id')
            patient = None
            
            if patient_id:
                try:
                    patient = Patient.objects.get(id=patient_id)
                
                except Patient.DoesNotExist:
                    print("Error with Patient")
            
            
            if view_func.__name__ == "signup":
                user_created = User.objects.latest('id')
                log = Log.objects.create(
                    user=user_created,
                    action_type='Created User',
                    patient=patient
                )
                log.save()
                
                
            log = Log.objects.create(
                user=req.user,
                action_type=action_type,
                patient=patient
            )
            log.save()
            
        return None


def asset_proxy_middleware(next):
    def middleware(request):
        # checking for .
        if "." in request.path:
            # Proxy request to asset server
            response = requests.get(f"{os.environ.get('ASSET_URL')}{request.path.replace('/static', '')}", stream=True)

            # Stream response
            return StreamingHttpResponse(
                response.raw,
                content_type=response.headers.get('content-type'),
                status=response.status_code,
                reason=response.reason
            )

        # call next middleware
        return next(request)

    return middleware

