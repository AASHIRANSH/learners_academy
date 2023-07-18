from django.shortcuts import render, redirect, HttpResponseRedirect

# forms
from users.forms import SignUpForm, EditUserProfileForm, EditAdminProfileForm, SignInForm, ProfileUpdateForm, ContactForm
from django.contrib import messages

# models
from django.contrib.auth.models import User
from users.models import Contact, Friend


from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm, SetPasswordForm, UserChangeForm
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash


def users(request):
    datag = request.GET
    if datag.get("users") == "friends":
        users = Friend.objects.all()
        type = "friends"
    else:
        users = User.objects.all()
        type = "users"

    vars = {
        "users":users,
        "type":type
    }
    return render(request, "users.html", vars)


def user_detail(request, id):
    user_obj = User.objects.get(pk=id)
    form = EditUserProfileForm(instance=user_obj)
    datap = request.GET
    if datap.get("action"):
        if datap.get("action") == "befriend":
            ''' current user object '''
            fr_other_obj = Friend.objects.filter(user=user_obj, friend=request.user)
            ''' other user object'''
            fr_own_obj = Friend.objects.filter(user=request.user, friend=user_obj)
            if fr_own_obj.exists():
                if fr_own_obj[0].is_friend:
                    messages.error(request, f"You are already a friend of {user_obj.username}")
                else:
                    messages.error(request, f"You have already sent friend request to {user_obj.username}")
            else:
                Friend.objects.create(user=request.user, friend=user_obj)
                messages.success(request, f"Friend request has been sent to {user_obj.username}")
        elif datap.get("action") == "unfriend":
            Friend.objects.remove(user=request.user)
            messages.success(request, f"You are not longer friend of {user_obj.username}")


    vars = {
        'user':user_obj,
        'form':form
    }
    return render(request, "userdetail.html", vars)


#Registration
def sign_up(request):
    if not request.user.is_authenticated:
        fm = SignUpForm(request.POST or None)
        if request.method == "POST":
            if fm.is_valid():
                fm.save()
                messages.success(request,'Your Account was Created!')
                return redirect('sign_in')
                # messages.add_message(request, messages.SUCCESS, 'Your Account Has Been Created!')
            else:
                messages.error(request,'Please check for any errors below!')

        return render(request, "sign_up.html", {'fm':fm})
    else:
        return redirect('profile')


'''Sign In / Login'''
def sign_in(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            # fm = AuthenticationForm(request=request, data=request.POST)
            fm = SignInForm(request=request, data=request.POST) #custom login form
            if fm.is_valid():
                uname = fm.cleaned_data['username']
                upass = fm.cleaned_data['password']
                user = authenticate(username=uname, password=upass)
                if user is not None:
                    login(request, user)
                    messages.success(request,'Loggen In Successfully!')
                    return HttpResponseRedirect('/users/profile/')
                # messages.add_message(request, messages.SUCCESS, 'Your Account Has Been Created!')
            else:
                messages.error(request,'Please check for any errors below!')
        else:
            fm = SignInForm() # fm = AuthenticationForm()
        return render(request, "sign_in.html", {'form':fm})
    else:
        next = request.GET.get("next")
        next = next if next else "/"
        return HttpResponseRedirect(next)
        

def user_profile(request):
    if request.user.is_authenticated:

        if request.method == 'POST':

            if request.user.is_superuser:
                fm = EditAdminProfileForm(request.POST, instance=request.user)
            else:
                fm = EditUserProfileForm(request.POST, instance=request.user)

            p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
            
            if fm.is_valid() and p_form.is_valid():
                fm.save()
                p_form.save()
                messages.success(request, f'Profile updated!!')
            return redirect('profile')
        else:
            if request.user.is_superuser:
                fm = EditAdminProfileForm(instance=request.user)
            else:
                fm = EditUserProfileForm(instance=request.user)

            p_form = ProfileUpdateForm(instance=request.user.profile)

        vars = {
            'form':fm,
            'p_form': p_form,
            'user':request.user,
            "friends":Friend.objects.filter(user=request.user) | Friend.objects.filter(friend=request.user)
        }

        return render(request, "profile.html", vars)
    
    else:
        return HttpResponseRedirect('/users/signin')

def change_profile(request):
    if request.user.is_authenticated:

        if request.method == 'POST':

            if request.user.is_superuser:
                fm = EditAdminProfileForm(request.POST, instance=request.user)
            else:
                fm = EditUserProfileForm(request.POST, instance=request.user)

            p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
            
            if fm.is_valid() and p_form.is_valid():
                fm.save()
                p_form.save()
                messages.success(request, f'Profile updated!!')
                return redirect('profile')
            else:
                messages.error(request, f'There was an error!!')
        else:
            if request.user.is_superuser:
                fm = EditAdminProfileForm(instance=request.user)
            else:
                fm = EditUserProfileForm(instance=request.user)

            p_form = ProfileUpdateForm(instance=request.user.profile)

        vars = {
            'form':fm,
            'p_form': p_form,
            'user':request.user
        }

        return render(request, "profile_change.html", vars)
    
    else:
        return HttpResponseRedirect('/users/signin')
 


def sign_out(request):
    logout(request)
    return redirect('sign_in')

'''change password with old password'''
def change_password(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            fm = PasswordChangeForm(user=request.user, data=request.POST)
            if fm.is_valid() :
                fm.save()
                update_session_auth_hash(fm.user)
                messages.success(request,'Password was changed Successfully!')
                return HttpResponseRedirect('/users/profile')
        else:
            fm = PasswordChangeForm(user=request.user)
        vars = {
            'form':fm
        }
        return render(request, "change_password.html", vars)
    else:
        return HttpResponseRedirect('/users/signin')

'''change password without old password'''
def change_password2(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            fm = SetPasswordForm(user=request.user, data=request.POST)
            if fm.is_valid() :
                fm.save()
                update_session_auth_hash(fm.user)
                messages.success(request,'Password was changed Successfully!')
                return HttpResponseRedirect('/users/profile')
        else:
            fm = SetPasswordForm(user=request.user)
        vars = {
            'form':fm
        }
        return render(request, "change_password.html", vars)
    else:
        return HttpResponseRedirect('/users/signin')


def custom_url(request, year):
    vars = {'year':year}
    return render(request, 'custom_url.html', vars)


def contact_us(request):
    form = ContactForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            req_post = request.POST.copy()
            req_post.update({'operator':request.user})
            form.save()
            messages.success(request, "Your message was sent, thank you!")
            return HttpResponseRedirect(request.GET.get("next"))
    vars = {
        "form":form
    }
    return render(request, "contact_us.html")