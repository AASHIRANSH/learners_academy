from django.contrib import admin
from coding.models import Language, Question, SubQuestion

# Register your models here.
@admin.register(Language)
class LanguageView(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Question)
class QuestionView(admin.ModelAdmin):
    list_display = ['question','language']

@admin.register(SubQuestion)
class SubQView(admin.ModelAdmin):
    list_display = ['question','mquestion']