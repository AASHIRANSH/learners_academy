from django.shortcuts import render, redirect
from django.contrib import messages
from languages.models import Word, Post, WordOfTheDay, Quote
import time

def index(request):
    quotes = Quote.objects.all()[0]
    posts = Post.objects.filter(published=True).order_by("-created_at")
    
    now = time.strftime("%a, %d %b %Y %H:%M")
    word = WordOfTheDay.objects.all().order_by("-created_at")[0]

    vars = {
        "quotes":quotes,
        "posts":posts,
        "word":word,
        "now":now
    }
    return render(request,"index.html", vars)