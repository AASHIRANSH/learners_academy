import os
from django.db import models
#User Model
from django.contrib.auth.models import User
from django.core import validators

''' this is to rename the image file uploaded by the user Profile Model below as dp '''
def content_file_name(instance, filename):
    ext = filename.split('.')
    filename = "%s_%s.%s" % (instance.title, ext[0], ext[-1])
    return os.path.join('uploads/posts', filename)

''' Posts and Exercises'''
class Topic(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Post(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, blank=True, null=True)
    published = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    fill_values = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to=content_file_name, blank=True, null=True)

    def is_pub(self):
        return f"{'published' if self.published else 'unpublished'}"
    
    def __str__(self):
        return f"{self.title} ({'published' if self.published else 'unpublished'})"


class Word(models.Model):
    category = models.CharField(choices=(('animals','animals'),('household','household')), max_length=50, default="", blank=True, null=True)
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
    tip = models.TextField(blank=True, null=True)
    tipp = models.ForeignKey(Post, on_delete=models.SET_NULL, blank=True, null=True)
    synonyms = models.TextField(max_length=1000, blank=True, null=True)
    compare = models.TextField(max_length=1000, blank=True, null=True)
    pic = models.ImageField(upload_to='dictionary/', blank=True, null=True)
    pic_url = models.CharField(max_length=200,blank=True, null=True)

    def __str__(self):
        return f'{self.word} ({self.pos})'


class Revise(models.Model):
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    date = models.DateField(auto_now=False, auto_now_add=True)
    rvcount = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.word.word} ({self.word.pos})"


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
    level = models.CharField(max_length=50, choices=(('a1','Beginner'),('a2','Pre Intermediate'),('b1','Intermediate'),('b2','Upper Intermediate'),('c1','Advanced'),('c2','Proficient')), default="", blank=True, null=True)
    pos = models.CharField(choices=(('preposition','preposition'),('helping verb','helping verb')), max_length=50, default="", blank=True, null=True)
    type = models.CharField(max_length=50, choices=(('fill','Blanks Filling'),('choice','Multiple Choice')))
    question = models.TextField()
    answer = models.TextField()
    target_values = models.CharField(max_length=50, default="", blank=True, null=True)
    choice = models.CharField(max_length=100, default="", blank=True, null=True)
    
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


class WordOfTheDay(models.Model):
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.word}"
    

class Quote(models.Model):
    quote = models.TextField()
    author = models.CharField(max_length=100)
    pic = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.quote}"
    
