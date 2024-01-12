from django.db import models

class Python(models.Model):
    chapter_name = models.CharField(("Chapter Name"), max_length=100)
    content = models.TextField(("Content"))
    
    def __str__(self):
        return self.chapter_name


class PythonQuestion(models.Model):
    chapter = models.ForeignKey(Python, on_delete=models.CASCADE)
    question = models.CharField(max_length=100)
    answer = models.TextField(default="")
    mcq = models.CharField(("MCQ"),max_length=100, blank=True, null=True)

    def __str__(self):
        return self.question


# class SubQuestion(models.Model):
#     mquestion = models.ForeignKey(Question, on_delete=models.CASCADE)
#     question = models.CharField(max_length=100)
#     answer = models.TextField(default="")

#     def __str__(self):
#         return self.question
    
class Post(models.Model):
    title = models.CharField(("Title"), max_length=50)
    content = models.TextField((""))
    language = models.CharField(("Language"), max_length=50)

    def __str__(self):
        return f'{self.title} ({self.language})'