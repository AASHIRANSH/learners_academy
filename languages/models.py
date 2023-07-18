# Create your models here.
from django.db import models
#User Model
from django.contrib.auth.models import User
from django.core import validators



class Word(models.Model):
    official = models.ManyToManyField(User, blank=True)
    ref_id = models.CharField(max_length=50, blank=True, null=True)
    word_root = models.CharField(max_length=100, blank=True, null=True)
    root_pos = models.CharField(max_length=50, blank=True, null=True)
    word = models.CharField(max_length=100)
    pronounce = models.TextField(max_length=100, blank=True, null=True)
    pronounce_hindi = models.TextField(max_length=100, blank=True, null=True)
    pos = models.CharField(max_length=50)
    grade = models.CharField(max_length=50, blank=True, null=True)
    forms = models.TextField(max_length=1000, blank=True, null=True)
    def_inf = models.CharField(max_length=200, blank=True, null=True)
    definition = models.TextField(max_length=1000)
    definition_hindi = models.TextField(max_length=1000, blank=True, null=True)
    example = models.TextField(max_length=2000, blank=True, null=True)
    synonyms = models.TextField(max_length=1000, blank=True, null=True)
    compare = models.TextField(max_length=1000, blank=True, null=True)
    pic = models.ImageField(upload_to='dictionary/', blank=True, null=True)
    pic_url = models.CharField(max_length=200,blank=True, null=True)

    def __str__(self):
        return f'{self.word} ({self.pos})'


class Revise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    date = models.DateField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return f"{self.word.word} ({self.word.pos})"

''' Posts and Exercises'''
class Topic(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Post(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    fill_values = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to=f"uploads/posts/{date_created}/{title}", blank=True, null=True)


    def __str__(self):
        return f"{self.title}"


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Dislike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Exercise(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    type = models.CharField(max_length=50, choices=(('fill','Blanks Filling'),('choice','Multiple Choice')))
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return f"{self.question} ({self.type})"
''' End Posts... '''

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

# class commentLike(models.Model):

# class commentDislike(models.Model):