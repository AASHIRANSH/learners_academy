from django.contrib.auth.models import User
import datetime
# from django.core.cache import cache
# from django.conf import settings
from django.utils.deprecation import MiddlewareMixin

class ActiveUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # print("Initial Middleware Run")
        # current_user = request.us

    def __call__(self, request):
        user = request.user
        if user.is_authenticated:
            now = datetime.datetime.now()+datetime.timedelta(hours=5,minutes=30)
            usrobj = User.objects.get(username=user.username)
            usrobj.profile.last_seen = now
            usrobj.save()

        # print("View Call Middleware Run", user.username)
        response = self.get_response(request)
        # print("View PostCall Middleware Run")
        return response