from django.contrib import admin
from .models import Word, Revise, Topic, Post, Comment, Like, Dislike, Exercise

# Register your models here.
@admin.register(Exercise)
class ExerciseView(admin.ModelAdmin):
    list_display = ['post','question']

@admin.register(Word)
class WordsView(admin.ModelAdmin):
    list_display = ['word','pos']

@admin.register(Revise)
class ReviseView(admin.ModelAdmin):
    list_display = ['word','user']

@admin.register(Topic)
class TopicView(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Post)
class PostView(admin.ModelAdmin):
    list_display = ('title','date_created','author')

    class Media:
        js= ('/static/js/tinyinject.js',)

@admin.register(Comment)
class CommentView(admin.ModelAdmin):
    list_display = ('content','post','author')

@admin.register(Like)
class LikeView(admin.ModelAdmin):
    list_display = ('post','user','created_at')

@admin.register(Dislike)
class DislikeView(admin.ModelAdmin):
    list_display = ('post','user','created_at')