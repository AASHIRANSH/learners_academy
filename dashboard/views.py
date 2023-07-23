from django.shortcuts import render
from django.contrib.auth.models import User

# Create your views here.

def index(request):
    vars = {
        "users":User.objects.all()
    }
    return render(request, "admin/dashboard.html", vars)

def users(request):
    vars = {
        "users":User.objects.all()
    }
    return render(request, "admin/users.html", vars)