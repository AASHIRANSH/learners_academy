from django.contrib import admin
from coding.models import Python, PythonQuestion, Post#, SubQuestion

# # Register your models here.
@admin.register(Python)
class PythonView(admin.ModelAdmin):
    list_display = ['chapter_name']

    # class Media:
    #     js= ('/static/js/tinyinject.js',)

@admin.register(PythonQuestion)
class QuestionView(admin.ModelAdmin):
    list_display = ['question','chapter']

# @admin.register(SubQuestion)
# class SubQView(admin.ModelAdmin):
#     list_display = ['question','mquestion']
    
@admin.register(Post)
class PostView(admin.ModelAdmin):
    list_display = ['title','language']

    class Media:
        js= ('/static/js/tinyinject.js',)