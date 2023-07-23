from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="dashboard"),
    path('users/', views.users, name="db_users"),
    # path('learn/<int:id>', views.index, name="learn_english"),
]