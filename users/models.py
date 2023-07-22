import os
from django.db import models
from django.contrib.auth.models import User
from PIL import Image
''' User Online / Offline System '''
from django.core.cache import cache 
import datetime
from learners_academy import settings
'''------------------------------'''

''' this is to rename the image file uploaded by the user Profile Model below as dp '''
def content_file_name(instance, filename):
    ext = filename.split('.')
    filename = "%s_%s.%s" % (instance.user.username, ext[0], ext[-1])
    return os.path.join('users/profile_pics', filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reputation = models.IntegerField(default=0)
    profession = models.CharField(choices=(('studend','student'),('teacher','teacher')), max_length=50)
    image = models.ImageField(verbose_name="Profile Picture:", default='users/default.jpg', upload_to=content_file_name)

    def __str__(self):
        return f'{self.user.username} Profile' #show how we want it to be displayed

    ''' Changing the dimensions of the uploaded image '''
    def save(self, **kwargs):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)


    def last_seen(self):
        return cache.get('seen_%s' % self.user.username)

    def online(self):
        if self.last_seen():
            now = datetime.datetime.now()
            if now > self.last_seen() + datetime.timedelta(
                        seconds=settings.USER_ONLINE_TIMEOUT):
                return False
            else:
                return True
        else:
            return False


class Friend(models.Model):
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name="%(class)s_friend", verbose_name="Friend", on_delete=models.CASCADE)
    is_friend = models.BooleanField(default=False)

    def isFriend(self):
        return self.is_friend
    
    def __str__(self):
        return f"{self.friend.username} ({self.user.username})"


class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50)
    subject = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return self.name+" "+self.message
    

class Notification(models.Model):
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.type