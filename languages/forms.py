from django import forms
from .models import Post, Exercise, Word, Comment, Collocation

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = "__all__"

class ExerciseForm(forms.ModelForm):
    class Meta:
        model = Exercise
        fields = "__all__"

class WordsForm(forms.ModelForm):

    class Meta:
        model = Word
        fields = "__all__"

class CollocationEntryForm(forms.ModelForm):
    
    class Meta:
        model = Collocation
        fields = "__all__"
        
class CommentForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(attrs={'rows': 3}))

    class Meta:
        model = Comment
        fields = ['content']