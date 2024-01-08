from django.shortcuts import render, HttpResponse
from .models import Python, PythonQuestion
from django.core.paginator import Paginator

# Create your views here.
def index(request):
    python = Python.objects.all()

    vars = {
        "python":python
    }
    return render(request,"coding/index.html", vars)

def course(request,course):
    get = request.GET

    if course == "python":
        model = Python.objects.all()

    chapter_num = int(get.get("chapter",1))
    chapter = model.filter(pk=chapter_num).first()
    # if chapter:


    vars = {
        "model":model,
        "course":course,
        "chapter":chapter,
        "chapter_num":chapter_num,
        "has_prev":chapter_num==1,
        "has_next":chapter_num==model.count()
    }
    return render(request,"coding/course.html", vars)

def revise(request):
    rv_obj = PythonQuestion.objects.all()
    vars = {
        "python":rv_obj
    }
    return render(request,"coding/revise.html", vars)

def tryit(request):

    return render(request,"coding/tryit.html")

def tryresult(request):
    data = request.POST
    return HttpResponse("Hi whatsup")