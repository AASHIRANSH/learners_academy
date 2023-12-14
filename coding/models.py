from django.db import models

class Language(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Question(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    question = models.CharField(max_length=100)
    answer = models.TextField(default="")

    def __str__(self):
        return self.question


class SubQuestion(models.Model):
    mquestion = models.ForeignKey(Question, on_delete=models.CASCADE)
    question = models.CharField(max_length=100)
    answer = models.TextField(default="")

    def __str__(self):
        return self.question