from django.urls import path
from . import views

urlpatterns = [
    path('memorizequraan', views.quran, name="memorize_quran"),
]