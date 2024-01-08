from django.urls import path
from coding import views

urlpatterns = [
    path('', views.index, name="coding"),
    path('<str:course>/', views.course, name="course"),
    path('revise', views.revise, name="coding_revise"),
    path('tryit', views.tryit, name="tryit"),
    path('tryresult', views.tryresult, name="tryresult"),
]