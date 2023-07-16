from django.urls import path
from . import views

'''url converter'''
from django.urls import register_converter
from . import converters
register_converter(converters.FourDigitYearConverter, 'yyyy')

urlpatterns = [
    path("userdetail/<int:id>/", views.user_detail, name="user_detail"),
    path('', views.sign_in),
    path('login/', views.sign_in, name='sign_in'),
    # path('sessions/<yyyy:year>/', views.custom_url, name='custom_url'),
    path('profile/', views.user_profile, name='profile'),
    path('changeprofile/', views.change_profile, name='change_profile'),
    path('register/', views.sign_up, name='sign_up'),
    path('logout/', views.sign_out, name='sign_out'),
    path('changepass/', views.change_password, name='changepass'),
    path('changepass2/', views.change_password2, name='changepass2'),
    #contact us
    path('contactus', views.contact_us, name="contact_us"),
]
