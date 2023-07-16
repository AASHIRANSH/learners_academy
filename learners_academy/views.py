from django.shortcuts import render, redirect
from django.contrib import messages
from languages.models import Word
from django.utils import timezone


def index(request):
    now = timezone.datetime.now()
    word = Word.objects.get(id=3)
    vars = {
        "word":word,
        "now":now
    }
    return render(request,"index.html", vars)