from django.urls import path
from coding import views

urlpatterns = [
    path('', views.index, name="coding"),
    path('coding/revise', views.revise, name="coding_revise"),
]