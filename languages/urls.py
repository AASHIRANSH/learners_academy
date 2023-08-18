from django.urls import path, include
from . import views

urlpatterns = [
    path('learn/<int:id>', views.index, name="learn_english"),
    path('', views.post_list, name="posts"),
    
    path('word/<int:id>', views.word, name="word"),
    path('words/', views.words, name="words"),
    path('wordss/', views.words2, name="words2"),
    path('mywords/', views.my_words, name="my_words"),

    path('exercise/', views.exercise, name="fexercise"),
    path('revise/', views.revise, name="frevise"),

    path('wordedit/', views.edit, name="edit_card"),
    path('data', views.data),
    path('flashcards/', include("languages.english.flashcards.urls")),
    
    # Ex-Action
    path('exact/', views.ex_action, name="ex_action"),

    # Posts
    path('post/', views.post_entry, name='post_entry'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('test/', views.post_detail_test, name='post_detail_test'),
    path('exercise/<int:pk>/', views.exercise, name='exercise'),
    path('exercise/', views.exercise_entry, name='exercise_entry'),

    # User Posts
    path('myposts/', views.post_entry, name='my_posts'),

    # Comments
    path('post/<int:pk>/like/', views.like, name='like'),
    path('post/<int:pk>/dislike/', views.dislike, name='dislike'),
    path('post/<int:pk>/edit_comment/', views.edit_comment, name='edit_comment'),
    path('post/<int:pk>/delete_comment/', views.delete_comment, name='delete_comment'),
]