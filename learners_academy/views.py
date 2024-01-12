from django.shortcuts import render, redirect
from django.contrib import messages
from languages.models import Word, Post, WordOfTheDay, Quote
from django.contrib.auth.models import User
import time

def index(request):
    user = request.user
    quotes = Quote.objects.all()[0]
    posts = Post.objects.filter(published=True).order_by("-created_at")[0:5]

    now = time.strftime("%a, %d %b %Y %H:%M")
    word = WordOfTheDay.objects.all().order_by("-created_at")[0]

    if user.is_authenticated:
        notifications = []
        notif = user.notification_set.all()

        for n in notif:
            if n.type == "friend request":
                notifications.append({
                    "type":"friend request",
                    "sender":n.sender.username
                })
            messages.info(request, f"You have a friend request from {n.sender.username}")
    else:
        notifications = []

    vars = {
        "quotes":quotes,
        "posts":posts,
        "word":word,
        "now":now,
        "notifications":notifications
    }
    return render(request,"index.html", vars)
