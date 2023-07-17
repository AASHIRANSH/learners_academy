from django.contrib import admin
from .models import Profile, Contact, Friend

admin.site.register(Profile)
admin.site.register(Friend)
admin.site.register(Contact)