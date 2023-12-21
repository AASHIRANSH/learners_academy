from django.shortcuts import render
from .models import Question, SubQuestion

# Create your views here.
def index(request):
    return render(request,"coding/index.html")

def revise(request):
    rv_obj = Question.objects.all()
    vars = {
        "obj":rv_obj
    }
    return render(request,"coding/revise.html", vars)