from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.flashcards),
    path('revise/', views.revise, name="revise"),
    path('revisepostpone', views.buttons.postpone, name="postpone"),
    path('revisepostponed', views.buttons.postpone, name="postponed"),
    
    path('flmo/', views.buttons.flmoupdate, name="flmo"),

    # BUTTONS
    path('easy/', views.buttons.btneasy, name="easy"),
    path('add', views.buttons.add_card, name="add"),
    path('addcard', views.word_entry, name="add_card"),
    path('edit/', views.fledit, name="edit"),
]