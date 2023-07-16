from django.urls import path, include
from . import views

urlpatterns = [
    path('home', views.index),
    path('', views.post_list, name="posts"),
    path('word/<int:id>', views.word, name="word"),
    path('words/', views.words, name="words"),
    path('revise/', views.revise, name="frevise"),
    path('wordedit/', views.edit, name="edit_card"),
    path('data', views.data),
    path('flashcards/', include("languages.english.flashcards.urls")),

    # Posts
    path('post/', views.post_entry, name='post_entry'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('test/', views.post_detail_test, name='post_detail_test'),
    path('exercise/<int:pk>/', views.exercise, name='exercise'),

    # User Posts
    path('myposts/', views.post_entry, name='my_posts'),

    # Comments
    path('post/<int:pk>/like/', views.like, name='like'),
    path('post/<int:pk>/dislike/', views.dislike, name='dislike'),
    path('post/<int:pk>/edit_comment/', views.edit_comment, name='edit_comment'),
    path('post/<int:pk>/delete_comment/', views.delete_comment, name='delete_comment'),
]