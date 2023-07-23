from django.contrib import admin
from .models import Profile, Contact, Friend, Notification

admin.site.register(Profile)
admin.site.register(Friend)
admin.site.register(Contact)
admin.site.register(Notification)