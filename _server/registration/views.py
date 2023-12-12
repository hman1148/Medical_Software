from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse

# Create your views here.
def sign_up(req):
    if req.method == "POST":
        
        try:
            user = User.objects.create_user(
                username=req.POST.get("email"),
                password=req.POST.get("password"),
                email=req.POST.get("email"),
                first_name=req.POST.get("first_name"),
                last_name=req.POST.get("last_name")
            )
            login(req, user)
            return redirect("/central")
        
        except: 
            return render("<h1>Username already exists</h1>")
    else:
        print("else")
        return render(req, "registration/sign_up.html")

def sign_in(req):
    if req.method == "POST":
        user = authenticate(req, username=req.POST.get("email"), password=req.POST.get("password"))
        print(user)
        if user is not None:
            login(req, user)
            print("here")
            return redirect("/central")

        print("not in user if")
        return render(req, "registration/sign_in.html")
    else:
        print("else")
        return render(req, "registration/sign_in.html")

def logout_view(request):
    logout(request)
    return JsonResponse({"success": True })