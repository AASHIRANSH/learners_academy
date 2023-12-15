from django.urls import path, include
from coding.views import views

urlpatterns = [
    path('coding/', views.index, name="coding"),
]