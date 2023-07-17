import os
from django.db import models
from django.contrib.auth.models import User
from PIL import Image

''' this is to rename the image file uploaded by the user Profile Model below as dp '''
def content_file_name(instance, filename):
    ext = filename.split('.')
    filename = "%s_%s.%s" % (instance.user.username, ext[0], ext[-1])
    return os.path.join('users/profile_pics', filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reputation = models.IntegerField(default=0)
    image = models.ImageField(verbose_name="Profile Picture:", default='users/default.jpg', upload_to=content_file_name)

    def __str__(self):
        return f'{self.user.username} Profile' #show how we want it to be displayed

    def save(self, **kwargs):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)


class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50)
    subject = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return self.name+" "+self.message