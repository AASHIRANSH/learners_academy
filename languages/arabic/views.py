from django.shortcuts import render

def quran(request):

    vars = {

    }
    return render(request, "arabic/quran.html", vars)