from django.contrib.auth.models import User
from users.models import Profile, Contact
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm, UsernameField
from django import forms

class SignInForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(SignInForm, self).__init__(*args, **kwargs)
    username = UsernameField(widget=forms.TextInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Enter your username here'
        }))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Enter your password here'
        }))


class SignUpForm(UserCreationForm):
    password1 = forms.CharField(label='Password',widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter a password'
        }))
    password2 = forms.CharField(label='Password confirmation',widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm the password'
        }))
    class Meta:
        model = User
        fields = ['username', 'first_name','last_name','email']
        labels = {'email':'Email'}
        #widgets = {'username':forms.TextInput(attrs={'class': 'form-control'}),'first_name':forms.TextInput(attrs={'class': 'form-control'}),'last_name':forms.TextInput(attrs={'class': 'form-control'}),'email':forms.TextInput(attrs={'class': 'form-control'})}
        # fields = '__all__' #it can also be used if you want all fields
        # exclude = ['password'] #it will get all fields except for password
        # help_text = {}
        # error_messages = {}


class EditUserProfileForm(UserChangeForm):
    # password = None
    date_joined = forms.DateTimeField(label="Joining Date",required=False, widget=forms.TextInput(attrs={"readonly":""}))
    is_active = forms.BooleanField(required=False, widget=forms.CheckboxInput(attrs={"readonly":""}))
    last_login = forms.CharField(required=False, widget=forms.TextInput(attrs={"readonly":""}))
    class Meta:
        model = User
        fields = "__all__"
        #fields = ['username', 'first_name','last_name','email','date_joined','last_login', 'is_active']
        #widgets = {'date_joined': TextInput(attrs={'cols': 80, 'rows': 20})}
        #labels = {'email':'email'}
        # exclude = ['']


class EditAdminProfileForm(UserChangeForm):
    password = None
    class Meta:
        model = User
        fields = "__all__"
        labels = {'email':'email'}


class ProfileUpdateForm(forms.ModelForm):
    #image = forms.FileField(required=False, widget=forms.FileInput(attrs={"t"}))
    reputation = forms.CharField(required=False, max_length=100,widget=forms.NumberInput())
    class Meta:
        model = Profile
        fields = ["image","reputation"]


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = "__all__"