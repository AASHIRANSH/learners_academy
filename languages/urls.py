from django.urls import path, include
from . import views

urlpatterns = [
    path('oxtems/', views.oxtems, name="oxtems"),
    path('camtems/', views.camtems, name="cams"),
    path('', views.post_list, name="posts"),
    path('learn/<int:id>', views.index, name="learn_english"),
    #Tenses
    path('presentindefinite/', views.pres_ind, name="present_indefinite"),

    path('dictionary/', views.dictionary, name="dictionary"),
    path('dictcoll/', views.dictionary_collocation, name="dictionary_collocation"),
    path('dictcollentry/', views.collocation_entry, name="collocation_entry"),
    path('dictcolledit/', views.collocation_edit, name="collocation_edit"),
    path('collocation/<int:id>', views.collocation_view, name="collocation_view"),
    path('worddetails/<int:word>', views.word_main, name="word_main"),
    path('word/<int:id>', views.word, name="word"),
    path('words/', views.words, name="words"),
    
    # Headwords update for searching
    path('dictionaryjson/', views.dictionary_json, name="dictionary_json"),

    path('ipa_converter/', views.ipa_convert, name="ipa_convert"),

    # Revision
    path('revisemain/', views.revise_main, name="revise"),
    path('revise/', views.revise, name="frevise"),
    path('exercise/', views.exercise, name="fexercise"),
    path('note-edit/<int:id>', views.note_edit, name="note_edit"),
    path('data', views.data, name="data"),
    path('datamain', views.data_main, name="data_main"),

    path('wordedit/', views.edit, name="edit_card"),
    path('flashcards/', include("languages.english.flashcards.urls")),
    
    # Posts
    path('post/', views.post_entry, name='post_entry'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('test/', views.post_detail_test, name='post_detail_test'),
    path('exercise/<int:pk>/', views.exercise, name='exercise'),
    path('exercise/', views.exercise_entry, name='exercise_entry'),
    path('exact/', views.ex_action, name="ex_action"),

    # User
    path('mywords/', views.my_words, name="my_words"),
    path('myposts/', views.post_entry, name='my_posts'),

    # Comments & Voting
    path('post/<int:pk>/like/', views.like, name='like'),
    path('post/<int:pk>/dislike/', views.dislike, name='dislike'),
    path('post/<int:pk>/edit_comment/', views.edit_comment, name='edit_comment'),
    path('post/<int:pk>/delete_comment/', views.delete_comment, name='delete_comment'),
]
