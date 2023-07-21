from django.shortcuts import render, redirect
from django.contrib import messages
from languages.models import Word, Post
import time

def index(request):
    posts = Post.objects.filter(published=True).order_by("-created_at")
    
    now = time.strftime("%a, %d %b %Y %H:%M")
    word = Word.objects.get(id=3)

    vars = {
        "posts":posts,
        "word":word,
        "now":now
    }
    return render(request,"index.html", vars)