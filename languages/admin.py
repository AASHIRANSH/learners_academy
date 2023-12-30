from django.contrib import admin
from .models import Topic, Post, Comment, Like, Dislike, Exercise
from .models import Word, Revise, WordOfTheDay, Quote, Thesaurus, Collocation

# Register your models here.
@admin.register(Exercise)
class ExerciseView(admin.ModelAdmin):
    list_display = ['post','question']



@admin.register(Word)
class WordsView(admin.ModelAdmin):
    list_display = ['word','pos']


@admin.register(Collocation)
class CollocationView(admin.ModelAdmin):
    list_display = ['word','pos']

@admin.register(Thesaurus)
class ThesaurusView(admin.ModelAdmin):
    list_display = ['name']

    class Media:
        js= ('/static/js/tinyinject.js',)


@admin.register(WordOfTheDay)
class WODView(admin.ModelAdmin):
    list_display = ['word','created_at']



@admin.register(Revise)
class ReviseView(admin.ModelAdmin):
    list_display = ['word','user']



@admin.register(Topic)
class TopicView(admin.ModelAdmin):
    list_display = ('name',)



@admin.register(Post)
class PostView(admin.ModelAdmin):
    list_display = ('title','created_at','author')

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



@admin.register(Quote)
class QuoteView(admin.ModelAdmin):
    list_display = ('quote','author')