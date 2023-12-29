from django.shortcuts import render, redirect, HttpResponseRedirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import PostForm, ExerciseForm, CommentForm, WordsForm
#WordsDB Model
from .models import Collocation, Word, Revise
from .models import Post, Exercise, Comment, Like, Dislike

from django.http import JsonResponse

from django.contrib.auth.models import User
import random, datetime, json
''' /home/muhammadsog/learners_academy/ '''

def index(request, id):
    with open("languages/english/data/db.json","rt",encoding='UTF-8') as fdb:
        db = fdb.read()
        db = json.loads(db)
    vars = {
        "id":id,
        "data":json.dumps(db)
    }
    return render(request, "english/learn.html", vars)


'''Tenses'''
def pres_ind(request):

    return render(request,"english/tenses/present_indefinite.html")


def exercise_entry(request):
    datag = request.GET
    if datag.get("action") == "editexercise":
        pk = datag.get("pk")
        instance = get_object_or_404(Exercise,pk=pk)
        form = ExerciseForm(instance=instance)
    else:
        form = ExerciseForm()

    
    if request.method == "POST":
        datap = request.POST
        datap = datap.copy()
        datap.update({'author':request.user})
        form = ExerciseForm(datap)

        if form.is_valid():
            form.save()

            if datag.get("action") == "editexercise":
                messages.success(request, "The exercise was edit successfully!")
            else:
                messages.success(request, "The exercise was added successfully!")
            return redirect("posts")
        else:
            messages.error(request, "There was an error!")
            return redirect("exercise_entry")
        
    vars = {
        "form":form
    }
    return render(request, "exercise_entry.html", vars)

def post_entry(request):
    datag = request.GET
    if datag.get("action") == "editpost":
        pk = datag.get("pk")
        post = Post.objects.get(pk=pk)
        form = PostForm(instance=post)
    else:
        form = PostForm()

    
    if request.method == "POST":
        datap = request.POST
        datap = datap.copy()
        datap.update({
            'author':request.user,
            'published':post.published,
            'topic':post.topic
        })
        form = PostForm(datap, instance=post)

        if form.is_valid():
            form.save()

            if datag.get("action") == "editpost":
                messages.success(request, "The post was updated successfully!")
            else:
                messages.success(request, "The post was added successfully!")
            return redirect("posts")
        else:
            messages.error(request, "There was an error!")
            return redirect("post_entry")
    vars = {
        "form":form
    }
    return render(request, "post_entry.html", vars)

from django.core.paginator import Paginator
def post_list(request):
    datag = request.GET
    if datag.get("action") == "myposts":
        posts = Post.objects.filter(author=request.user)
    else:
        posts = Post.objects.filter(published=True)
        
    paginator = Paginator(posts, 5)  # Show 6 contacts per page.
    page_number = datag.get("page")
    page_obj = paginator.get_page(page_number)


    vars = {
        "posts": posts,
        "page_obj": page_obj
    }
    return render(request, 'english/post_list.html', vars)


def post_detail(request, pk):
    # user_obj = User.objects.get(username=request.user.username)
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.all()
    user_in_like_set = post.like_set.filter(user__username=request.user.username).exists()
    
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.save()
            return redirect('post_detail', pk=pk)
    else:
        form = CommentForm()

    vars = {
        # 'user_obj':user_obj,
        'post': post,
        'comments': comments,
        'form': form,
        'user_in_like_set': user_in_like_set,
        "premium":True
        }
    return render(request, 'post_detail.html', vars)


def exercise(request, pk):
    # user_obj = User.objects.get(username=request.user.username)
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.all()
    user_in_like_set = post.like_set.filter(user__username=request.user.username).exists()
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.save()
            return redirect('post_detail', pk=pk)
    else:
        form = CommentForm()

    vars = {
        # 'user_obj':user_obj,
        'post': post,
        'comments': comments,
        'form': form,
        'user_in_like_set': user_in_like_set
        }
    return render(request, 'exercise.html', vars)


def post_detail_test(request):

    return render(request, 'post_detail_test.html')


'''Like and Dislike'''
@login_required
def like(request, pk):
    post = get_object_or_404(Post, pk=pk)
    like = Like.objects.filter(post=post, user=request.user).first()
    if like:
        like.delete()
    else:
        Like.objects.create(post=post, user=request.user)
        Dislike.objects.filter(post=post, user=request.user).delete()
    return redirect('post_detail', pk=pk)

@login_required
def dislike(request, pk):
    post = get_object_or_404(Post, pk=pk)
    dislike = Dislike.objects.filter(post=post, user=request.user).first()
    if dislike:
        dislike.delete()
    else:
        Dislike.objects.create(post=post, user=request.user)
        Like.objects.filter(post=post, user=request.user).delete()
    return redirect('post_detail', pk=pk)

@login_required
def edit_comment(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    if request.user == comment.author:
        if request.method == 'POST':
            form = CommentForm(request.POST, instance=comment)
            if form.is_valid():
                form.save()
                return redirect('post_detail', pk=comment.post.pk)
        else:
            form = CommentForm(instance=comment)
        return render(request, 'edit_comment.html', {'form': form})
    else:
        return redirect('post_detail', pk=comment.post.pk)

@login_required
def delete_comment(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    if request.user.is_superuser or request.user == comment.author:
        comment.delete()
        return redirect('post_detail', pk=comment.post.pk)
    else:
        return redirect('post_detail', pk=comment.post.pk)


from os.path import exists

def word(request,id):
    word = Word.objects.get(id=id)
    
    if request.user.is_authenticated:
        try:
          Revise.objects.get(user=request.user, word=word)
          visible = 'disabled'
        except:
          visible = None
    else:
        visible = None

    if "/" not in word.pronounce:
        if word.pos == "verb":
            obj = Word.objects.filter(ref_id=word.word+"_1").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = word.pronounce
        elif word.pos == "noun":
            obj = Word.objects.filter(ref_id=word.word+"_2").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = word.pronounce
        elif word.pos == "adjective":
            obj = Word.objects.filter(ref_id=word.word+"_3").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = word.pronounce
        elif word.pos == "adverb":
            obj = Word.objects.filter(ref_id=word.word+"_4").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = word.pronounce
        elif word.pos == "conjunction":
            obj = Word.objects.filter(ref_id=word.word+"_5").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = word.pronounce
        else:
            pronounce = word.pronounce
    else:
        pronounce = word.pronounce


    if "/" not in word.forms:
        if word.pos == "verb":
            obj = Word.objects.filter(ref_id=word.word+"_1").first()
            if obj:
                forms = obj.forms
            else:
                forms = word.forms
        elif word.pos == "noun":
            obj = Word.objects.filter(ref_id=word.word+"_2").first()
            if obj:
                forms = obj.forms
            else:
                forms = word.forms
        else:
            forms = word.forms
    else:
        forms = word.forms

    
    example = word.example.splitlines()
    # randnums = random.sample(items, 3) #for more than one item, it contains 3 random objects from the model
    
    vars = {
        "visible":visible,
        "word":word,
        "pronounce":pronounce.splitlines(),
        "forms":forms.splitlines(),
        "example":set(example),
        "refresh":False
    }
    return render(request, "english/words.html", vars)


def words(request):
    # file_path = f"languages/english/flashcards/data/users/{request.user.username}.txt"
    words_all = Word.objects.all()
    items = list(words_all)
    rv_items = list(Revise.objects.all())
    randitem = random.choice(items)

    if Revise.objects.filter(user=request.user, word=randitem):
        visible = 'disabled'
        refresh = 'True'
    else:
        visible = None
        refresh = 'False'
    
    if "/" not in randitem.pronounce:
        if randitem.pos == "verb":
            obj = Word.objects.filter(ref_id=randitem.word+"_1").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "noun":
            obj = Word.objects.filter(ref_id=randitem.word+"_2").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "adjective":
            obj = Word.objects.filter(ref_id=randitem.word+"_3").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "adverb":
            obj = Word.objects.filter(ref_id=randitem.word+"_4").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "conjunction":
            obj = Word.objects.filter(ref_id=randitem.word+"_5").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        else:
            pronounce = randitem.pronounce
    else:
        pronounce = randitem.pronounce


    if "/" not in randitem.forms:
        if randitem.pos == "verb":
            obj = Word.objects.filter(ref_id=randitem.word+"_1").first()
            if obj:
                forms = obj.forms
            else:
                forms = randitem.forms
        elif randitem.pos == "noun":
            obj = Word.objects.filter(ref_id=randitem.word+"_2").first()
            if obj:
                forms = obj.forms
            else:
                forms = randitem.forms
        else:
            forms = randitem.forms
    else:
        forms = randitem.forms
        

    # if exists(file_path):
    #     with open(file_path, "r", encoding="UTF-8") as file:
    #         added_words = file.read()

    # if "/" not in randitem.forms:
    #     if not Words.objects.get(ref_id=randitem.word):
    #         forms = randitem.forms
    #     else:
    #         obj = Words.objects.get(ref_id=randitem.pronounce)
    # else:
    #     forms = randitem.forms
    
    example = randitem.example.splitlines()
    # randnums = random.sample(items, 3) #for more than one item, it contains 3 random objects from the model
    
    vars = {
        "visible":visible,
        "word":randitem,
        "pronounce":pronounce.splitlines(),
        "forms":forms.splitlines(),
        "example":set(example),
        "refresh":refresh
    }
    return render(request, "english/words.html", vars)

def dictionary(request):
    # file_path = f"languages/english/flashcards/data/users/{request.user.username}.txt"
    vars_get = request.GET
    search_query = vars_get.get("q","").strip()
    search_pos = vars_get.get("pos","").strip()
    search_in = vars_get.get("in","").strip()

    if search_query:
        words = Word.objects.filter(word__contains=f"{search_query}") | Word.objects.filter(pos=search_pos, definition__contains=f"{search_in}")
    else:
        words = Word.objects.all()
    
    paginator = Paginator(words, 10)  # Show 6 contacts per page.
    page_number = vars_get.get("page") if vars_get.get("page") else 1
    page_navi = int(page_number)-1
    page_obj = paginator.get_page(page_number)

    vars = {
        # "visible":visible,
        "wordscount":words.count(),
        "wordsp":page_obj,
        "pagen":page_navi,
        # "pronounce":pronounce.splitlines(),
        # "forms":forms.splitlines(),
        # "example":set(example),
    }
    return render(request, "english/dictionary.html", vars)

def dictionary_collocation(request):
    # file_path = f"languages/english/flashcards/data/users/{request.user.username}.txt"
    vars_get = request.GET
    search_query = vars_get.get("q","").strip()
    search_pos = vars_get.get("pos","").strip()
    search_in = vars_get.get("in","").strip()

    if search_query:
        words = Collocation.objects.filter(word__contains=f"{search_query}") | Collocation.objects.filter(pos=search_pos, definition__contains=f"{search_in}")
    else:
        words = Collocation.objects.all()
    
    paginator = Paginator(words, 10)  # Show 6 contacts per page.
    page_number = vars_get.get("page") if vars_get.get("page") else 1
    page_navi = int(page_number)-1
    page_obj = paginator.get_page(page_number)

    vars = {
        "wordscount":words.count(),
        "wordsp":page_obj,
        "pagen":page_navi,
    }
    return render(request, "english/dictionary_collocation.html", vars)

def ipa_convert(request):
    return render(request,"english/ipa_converter.html")

def my_words(request):
    words = Revise.objects.filter(user=request.user)

    vars = {
        # "visible":visible,
        "words":words,
        # "pronounce":pronounce.splitlines(),
        # "forms":forms.splitlines(),
    }
    return render(request, "english/my_words.html", vars)

@login_required
def exercise(request):
    # file_path = f"languages/english/flashcards/data/users/{request.user.username}.txt"
    # with open(file_path, "r", encoding="UTF-8") as file:
    #     added_words = file.readlines()

    # NOTE: len(x[0].official.all())

    user = request.user
    rv_obj = Revise.objects.filter(user=user)
    if not rv_obj:
        messages.warning(request, "You have not added any words yet!")
        return redirect("words")

    today = datetime.date.today()
    today = today.strftime("%Y-%m-%d")

    rvp_obj = rv_obj.filter(date__lte=today)
    items = list(rvp_obj.order_by('-date'))
    randitem = random.choices(items, k=4)
    print(randitem)

    words = []
    for i in items:
        words.append({"id":i.id,"word":i.word.word,"definition":i.word.definition})

    
    vars = {
        "words":json.dumps(words), # if needed for JavaScript use "json.dumps(words)"
        "word":randitem,
        # "pronounce":pronounce.splitlines(),
        # "example":example,
        "rv_total_count":rv_obj.count(),
        "rv_count":rvp_obj.count(),
    }
    return render(request, "english/exercise.html", vars)

@login_required
def revise(request):
    # file_path = f"languages/english/flashcards/data/users/{request.user.username}.txt"
    # with open(file_path, "r", encoding="UTF-8") as file:
    #     added_words = file.readlines()

    # NOTE: len(x[0].official.all())
    user = request.user
    rv_obj = Revise.objects.filter(user=user)
    if not rv_obj:
        messages.warning(request, "You have not added any words yet!")
        return redirect("words")

    today = datetime.date.today()
    today = today.strftime("%Y-%m-%d")

    rvp_obj = rv_obj.filter(date__lte=today)
    if not rvp_obj:
        messages.warning(request, "You do not have any words due for revision!")
        return redirect("words")
    
    list_1 = list(rvp_obj[0:5])
    items = list(rvp_obj.order_by('-date')[0:5])
    items.extend(list_1)
    randitem = random.choice(items)
    randitem = randitem.word
    pronounce = randitem.pronounce
    example = set(randitem.example.splitlines())
    # context = randitem.context.splitlines()

    if "/" not in randitem.pronounce:
        if randitem.pos == "verb":
            obj = Word.objects.filter(ref_id=randitem.word+"_1").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "noun":
            obj = Word.objects.filter(ref_id=randitem.word+"_2").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "adjective":
            obj = Word.objects.filter(ref_id=randitem.word+"_3").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "adverb":
            obj = Word.objects.filter(ref_id=randitem.word+"_4").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
        elif randitem.pos == "conjunction":
            obj = Word.objects.filter(ref_id=randitem.word+"_5").first()
            if obj:
                pronounce = obj.pronounce
            else:
                pronounce = randitem.pronounce
    else:
        pronounce = randitem.pronounce


    if "/" not in randitem.forms:
        if randitem.pos == "verb":
            obj = Word.objects.filter(ref_id=randitem.word+"_1").first()
            if obj:
                forms = obj.forms
            else:
                forms = randitem.forms
        elif randitem.pos == "noun":
            obj = Word.objects.filter(ref_id=randitem.word+"_2").first()
            if obj:
                forms = obj.forms
            else:
                forms = randitem.forms
        else:
            forms = randitem.forms
    else:
        forms = randitem.forms
    
    # randnums = random.sample(items, 3) #for more than one item, it contains 3 random objects from the model
    vars = {
        "word":randitem,
        "pronounce":pronounce.splitlines(),
        "forms":forms.splitlines(),
        "example":example,
        # "context":context,
        "rv_total_count":rv_obj.count(),
        "rv_count":rvp_obj.count(),
    }
    return render(request, "english/revise.html", vars)


def edit(request):
    data = request.GET
    word_id = data.get('word_id')
    word_obj = Word.objects.get(id=word_id)
    form = WordsForm(instance=word_obj)

    if request.method == "POST":
        datap = request.POST
        data_form = WordsForm(datap or None, instance=word_obj)
        if data_form.is_valid():
            data_form.save()
            messages.success(request, "Great! the word was edited!")
            return HttpResponseRedirect('/english/revise')
        else:
            messages.error(request, "There was an error!")
            return HttpResponseRedirect('/english/revise')


    vars = {
        "form":form,
        "edit":True
    }
    return render(request, "english/flashcards/add_card.html", vars)


def data(request):
    user = request.user
    data = request.GET
    word = data.get('word')
    word_obj = get_object_or_404(Word,id=word)

    today = datetime.date.today()

    if data.get('data') == "mastered":
        entry = Revise.objects.get(word=word_obj, user=user)
        rvcount = entry.rvcount
        td = datetime.timedelta(days=30)
        entry.date = today+td
        entry.rvcount += 1
        entry.save()
        messages.success(request, f"Great! the word will show up after {rvcount+30} days")
        return HttpResponseRedirect('/english/revise')
    
    if data.get('data') == "easy":
        entry = Revise.objects.get(word=word_obj, user=user)
        rvcount = entry.rvcount
        td = datetime.timedelta(days=2+rvcount)
        entry.date = today+td
        entry.rvcount += 2
        entry.save()
        #messages.success(request, f"Great! the word will show up after {rvcount+2} days")
        return HttpResponseRedirect('/english/revise')
    
    elif data.get('data') == "hard":
        entry = Revise.objects.get(word=word_obj, user=user)
        rvcount = entry.rvcount
        td = datetime.timedelta(days=1)
        entry.date = today+td
        entry.rvcount -= 1 if rvcount >= 1 else 0
        entry.save()
        #messages.success(request, f"Great! the word will show up after {rvcount+1} days")
        return HttpResponseRedirect('/english/revise')
    
    elif data.get('data') == "remove":
        entry = Revise.objects.get(word=word_obj, user=user)
        entry.delete()
        messages.success(request, f'The word "{word_obj}" was removed')
        return HttpResponseRedirect('/english/revise')
    
    if data.get('data') == "new":
        uwords = Revise.objects.filter(user=user, word=word)
        if not uwords.exists():
            Revise.objects.create(user=user, word=word_obj)
            messages.success(request, f"the word '{word_obj.word}' was added successfully")
            return HttpResponseRedirect('/english/word/'+word)
        else:
            messages.warning(request, "the word already exists")
            return HttpResponseRedirect('/english/words')
        print(uwords)


    # file_path = f"languages/english/flashcards/data/users/{request.user.username}.txt"

    # if exists(file_path):
    #     with open(file_path, "r", encoding="UTF-8") as file:
    #         added_words = file.read()

    #     if data.get('word') in added_words:
    #         messages.error(request,"the word is already added")
    #         return HttpResponseRedirect('/english/words')
    #     else:
    #         # entry = Revise(user=request.user,word=word_obj)
    #         if data.get('data') == "new":
    #             with open(file_path,"a+", encoding="UTF-8") as file:
    #                 file.write(data.get('word')+"\n")
    #             messages.success(request,"the word was added")
    #             return HttpResponseRedirect('/english/words')
    # else:
    #     if data.get('data') == "new":
    #         with open(file_path, "w", encoding="UTF-8") as file:
    #             file.write(data.get('word')+"\n")
    #         messages.success(request,"the word was added")
    #         return HttpResponseRedirect('/english/words')


def ex_action(request):
    if request.POST:
        datap = request.POST
        questions = json.loads(datap.get("questions"))
        errors = json.loads(datap.get("errors"))
        
        user_obj = User.objects.get(username=request.user.username)
        user_q = user_obj.profile.ex_done
        
        for q in questions:
            if q in user_q:
                pass
            else:
                user_obj.profile.ex_done += q+","
                user_obj.profile.reputation += 1
                user_obj.save()
    return JsonResponse(["successful"], safe=False)
