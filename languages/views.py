from django.shortcuts import render, redirect, HttpResponse, HttpResponseRedirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

#WordsDB Model
from .models import Word, Revise, Collocation, Topic, Dictionary, Fav
from .models import Post, Exercise, Comment, Like, Dislike
from .forms import PostForm, ExerciseForm, CommentForm, WordsForm, CollocationEntryForm

from django.core import serializers
from django.core.paginator import Paginator
import random, datetime, json, requests
import urllib.request
from django.contrib import messages

''' /home/muhammadsog/learners_academy/ '''

def index(request, id):
    strid = str(id)

    with open("languages/data/en.json","rt",encoding='UTF-8') as endb:
        endb = json.load(fp=endb)
    with open("languages/english/data/db.json","rt",encoding='UTF-8') as tp:
        tp = json.load(fp=tp)

    dbb = []
    for x in endb["unit_"+strid]:
        et = x["type"]
        if et=="word":
            it = Dictionary.objects.get(pk=x["pk"])
            topic = it.senses[x["sense"]]["topics"][0][0] if it.senses[x["sense"]]["topics"] else None

            x["content"] = [[it.word,it.senses[x["sense"]]["definition"]["hi"]["basic"]],tp[topic] if topic else ""]
            dbb.append(x)
        elif et=="sentence":
            pass

    with open("languages/english/data/db.json","rt",encoding='UTF-8') as fdb:
        db = fdb.read()

    vars = {
        "id":id,
        "data":db,
        "db":json.dumps(dbb)
    }
    return render(request, "english/learn_main.html", vars)

def oxtems(request):
    import os
    files_dir = "languages/templates/english/dictionary/oxtems/temps/"
    files = os.listdir(files_dir)
    get = request.GET

    if get.get("action")=="img":
        import os
        files = os.listdir("languages/templates/english/dictionary/oxtems/temps/")
        for f in files:
            links = []
            with open("languages/templates/english/dictionary/oxtems/temps/"+f, encoding="UTF-8") as temp:
                html = temp.read()

            with open(f"languages/data/imglinks_{files[0]}_{files[-1]}.txt", mode="a+", encoding="UTF-8") as temp:
                x = True
                aus = 0
                while x:
                    aus = html.find('img class="thumb"',aus+1)
                    img = html.find('src="',aus+17)
                    if aus == -1:
                        break
                    else:
                        links.append(html[aus+5:aue]+"\n")
                temp.writelines(links)

    if get.get("action")=="aud":
        aus = 0
        for f in files:
            links = []
            with open(files_dir+f, encoding="UTF-8") as temp:
                html = temp.read()

            with open(f"languages/data/audlinks_{files[0]}_{files[-1]}.txt", mode="a+", encoding="UTF-8") as temp:
                x = True
                while x:
                    aus = html.find('mp3="',aus+1)
                    aue = html.find('"',aus+5)
                    if aus == -1:
                        break
                    else:
                        links.append(html[aus+5:aue]+"\n")
                temp.writelines(links)

    if get.get("action")=="trim":
        for f in files:
            with open(files_dir+f, encoding="UTF-8") as temp:
                html = temp.read()
                html = html[html.find('<div id="entryContent"'):html.find('<div class="responsive_center')]

            with open(files_dir+f, mode="w", encoding="UTF-8") as temp:
                temp.write(html)

    if get.get("action")=="del":
        Dictionary.objects.all().delete()

    if request.method == "POST":
        data = request.POST.get("data")
        data = data.replace("ampp","&")
        # print(data)
        # with requests.get('https://pastebin.com/raw/X8f4Nz6v', stream=True) as r:
        #     r.raise_for_status()
        #     b = bytearray()
        #     for chunk in r.iter_content(4096):
        #         b += chunk
        #     d = json.loads(b.decode())
        data = json.loads(data)

        if data["forms"]:
            for x in range(len(data["forms"])):
                data["forms"][x][0] = " ".join(data["forms"][x][0].split())
                data["forms"][x][1] = " ".join(data["forms"][x][1].split())
                data["forms"][x][2] = [" ".join(i.split()) for i in data["forms"][x][2]]
            
        for x in data["senses"]:
            x["labels"] = " ".join(x["labels"].split())
            x["variants"] = [" ".join(i.split()) for i in x["variants"]]
            x["definition"] = {
                "ar": {
                    "main":"",
                    "basic":""
                },
                "en": {
                    "main":" ".join(x["definition"].split()),
                    "basic":""
                },
                "hi": {
                    "main":"",
                    "basic":""
                },
                "ur": {
                    "main":"",
                    "basic":""
                },
                "tr": {
                    "main":"",
                    "basic":""
                },
                "gr": {
                    "main":"",
                    "basic":""
                }
            }
            x["examples"] = [" ".join(i.split()) for i in x["examples"]]

        ''' Write to JSON file'''
        # with open("languages/data/oxtems.json", mode="r") as js:
        #     db = json.load(fp=js)
        #     db.append(data)

        # with open("languages/data/oxtems.json", mode="w") as js:
        #     js.write(json.dumps(db,indent=4))

        id_str = data["idioms_startfrom"]
        if data["pos"]!="phrasal verb":
            Dictionary.objects.create(
                word=data["word"],
                pos=data["pos"],
                cefr=data["cefr"],
                pronounciation=data["pronounciation"],
                forms=data["forms"],
                senses=data["senses"][0:id_str-1 if id_str else None],
                word_details=data["word_details"]
            )

        if id_str:
            for i in range(len(data["idcuts"][0])):
                for j in range((data["idcuts"][3][i][-1]+1)-data["idcuts"][3][i][0]):
                    data["senses"][data["idcuts"][3][i][j]]["sensenum"] = j+1
                Dictionary.objects.create(
                    word=data["idcuts"][0][i],
                    pos="phrasal verb" if data["pos"]=="phrasal verb" else "idiom",
                    senses=data["senses"][data["idcuts"][3][i][0]:data["idcuts"][3][i][-1]+1],
                    word_details={
                        "oxs":data["word_details"]["oxs"],
                        "grammar":"",
                        "labels":data["idcuts"][1][i],
                        "variants":data["idcuts"][2][i],
                        "inflections":"",
                        "use":"",
                        "word_origin":"",
                        "culture":""
                    }
                )

        return JsonResponse(data, safe=False)
        ''' Write to JSON file end'''
    else:
        tn = int(get.get("t","1"))
        page = requests.get('http://localhost:8000/english/')
        # r = urllib.request.urlopen('https://w3schools.com/')
        # page = r.read()

        # links = []
        # for x in range(1, len(files)+1):
        #     link = "english/dictionary/oxtems/temps/ox"+f"{x:03n}"
        #     links.append(link)

        vars = {
            # "page":templ,
            # "p":page.text,
            "link":"english/dictionary/oxtems/temps/ox"+f"{tn:03n}"
            # "links":links
        }
        return render(request,"english/dictionary/oxtems/index.html", vars)

def camtems(request):
    if request.GET.get("action")=="aud":
        import os
        aus = 0
        files = os.listdir("languages/templates/english/dictionary/oxtems/temps/")
        for f in files:
            links = []
            with open("languages/templates/english/dictionary/oxtems/temps/"+f, encoding="UTF-8") as temp:
                html = temp.read()

            with open(f"languages/data/audlinks_{files[0]}_{files[-1]}.txt", mode="a+", encoding="UTF-8") as temp:
                x = True
                while x:
                    aus = html.find('mp3="',aus+1)
                    aue = html.find('"',aus+5)
                    if aus == -1:
                        break
                    else:
                        links.append(html[aus+5:aue]+"\n")
                temp.writelines(links)

    if request.GET.get("action")=="trim":
        import os
        for f in os.listdir("languages/templates/english/dictionary/oxtems/temps/"):
            with open("languages/templates/english/dictionary/oxtems/temps/"+f, encoding="UTF-8") as temp:
                html = temp.read()
                html = html[html.find('<div class="di-body"'):html.find('<div class="lmt-10')]

            with open("languages/templates/english/dictionary/oxtems/temps/"+f, mode="w", encoding="UTF-8") as temp:
                temp.write(html)

    if request.method == "POST":
        data = request.POST.get("data")
        data = json.loads(data)

        if data["forms"]:
            for x in range(len(data["forms"])):
                data["forms"][x][0] = " ".join(data["forms"][x][0].split())
                data["forms"][x][1] = " ".join(data["forms"][x][1].split())
                data["forms"][x][2] = [" ".join(i.split()) for i in data["forms"][x][2]]
            
        for x in data["senses"]:
            x["definition"] = " ".join(x["definition"].split())
            x["examples"] = [" ".join(i.split()) for i in x["examples"]]
        for x in data["idioms"]:
            x["labels"] = " ".join(x["labels"].split())
            x["definition"] = " ".join(x["definition"].split())
            x["variants"] = " ".join(x["variants"].split())
            x["examples"] = [" ".join(i.split()) for i in x["examples"]]

      
        with open("languages/data/oxtems.json", mode="r") as js:
            db = json.load(fp=js)
            db.append(data)

        with open("languages/data/oxtems.json", mode="w") as js:
            js.write(json.dumps(db,indent=4))
            # json.dump(obj=db, fp=js, indent=4)
        return JsonResponse(data, safe=False)
    else:
        get = request.GET
        tn = get.get("t","1")
        page = requests.get('http://localhost:8000/english/')
        # r = urllib.request.urlopen('https://w3schools.com/')
        # page = r.read()
        vars = {
            # "page":templ,
            "p":page.text,
            "link":"english/dictionary/oxtems/temps_cam/ca"+f"{int(tn):03n}"
        }
        return render(request,"english/dictionary/oxtems/cam_index.html", vars)


'''Tenses'''
def pres_ind(request):

    return render(request,"english/tenses/present_indefinite.html")

''' Posts '''
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
        "form":form,
        "edit":True
    }
    return render(request, "post_entry.html", vars)

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
    post.views += 1
    post.save()
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

    collocation = Collocation.objects.filter(word=word.word, pos=word.pos).first()
    example = word.example.splitlines()
    # randnums = random.sample(items, 3) #for more than one item, it contains 3 random objects from the model
    
    vars = {
        "visible":visible,
        "word":word,
        "pronounce":pronounce.splitlines(),
        "forms":forms.splitlines(),
        "collocation":collocation,
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

''' Creates a file with all dictiory headwords '''
def dictionary_json(request):
    get = request.GET

    if get.get("action")=="heads":
        words = Dictionary.objects.all().order_by('word')
        headwords = []
        pos = []
        unique = []
        for x in words:
            if x.word+x.pos not in unique:
                # headwords.append(x.word) #model.append({"pk":x.pk,"word":x.word,"pos":x.pos})
                pos.append(x.pos)
                unique.append(x.word+x.pos)
        
        # with open("database/models/headwords.json", mode="w") as jsondict:
        #     json.dump(headwords, fp=jsondict)

        with open("database/models/pos.json", mode="w") as jsondict:
            json.dump(pos, fp=jsondict)
    
    elif get.get("action")=="topic":
        words = Dictionary.objects.all().order_by('word')
        for word in words:
            senses = word.senses
            for sense in senses:
                if sense.topic:
                    Topic.objects.create(name=sense.topic,cefr=sense.topic_cefr,word=word,sense=sense.sensenum)

    elif get.get("action")=="model":
        words = Word.objects.all().order_by('word')
        adv_model = serializers.serialize("json",words)
        adv_model = json.loads(adv_model)
        with open("languages/data/models/words.json", mode="w", encoding="UTF-8") as file:
            json.dump(obj=adv_model,fp=file, indent=4)
        return HttpResponse("The model was converted to JSON successfully")

    

    # return JsonResponse(adv_model, safe=False)
    return None

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

def collocation_entry(request):

    if request.method == "POST":
        datap = request.POST
        data = datap.copy()

        fields = []
        field = {}
        for x,y in data.items():
            if x.startswith("entry_pos"):
                field.update({
                    "entry_pos":y
                })
            if x.startswith("context"):
                field.update({
                    "context":y
                })
            if x.startswith("examples"):
                field.update({
                    "examples":y
                })
            if len(field) == 3:
                fields.append(field)
                field = {}

        data.update({
            "fields":fields
        })

        get_word = data.get('word')
        get_pos = data.get('pos')
        get_usage = data.get('usage')

        form = CollocationEntryForm(data)

        if form.is_valid():
            # form.save()
            messages.success(request, f'the entry of "{get_word}" was added')
            # messages.success(request, dict(data))
            messages.success(request, fields)
            
            vars = {
                "form":form,
                "word":get_word,
                "pos":get_pos,
                "usage":get_usage,
                "edit":False
            }
            
            return render(request, "english/collocation_entry.html", vars)
            # return HttpResponseRedirect('/english/flashcards/addcard')
        else:
            messages.error(request, form)

    else:
        form = CollocationEntryForm()

    vars = {
        "form":form,
        "edit":False
    }
    return render(request,"english/collocation_entry.html", vars)

def collocation_edit(request):
    data = request.GET
    word_id = data.get('word_id')
    word_obj = Collocation.objects.get(id=word_id)
    fields = word_obj.fields

    form = CollocationEntryForm(instance=word_obj)

    if request.method == "POST":
        datap = request.POST
        data = datap.copy()

        fields = []
        field = {}

        for x, y in data.items():
            
            if x.startswith("entry_pos"):
                field.update({
                    "entry_pos":y
                })
            if x.startswith("context"):
                field.update({
                    "context":y
                })
            if x.startswith("examples"):
                field.update({
                    "examples":y
                })
            if len(field) == 3:
                fields.append(field)
                field = {}

        data.update({
            "fields":fields
        })

        data_form = CollocationEntryForm(data or None, instance=word_obj)
        if data_form.is_valid():
            data_form.save()
            messages.success(request, "Great! the entry was edited!")
            return redirect("/english/collocation/"+word_id)
        else:
            messages.error(request, form.errors)

    vars = {
        "form":form,
        "fields":fields,
        "edit":True
    }
    return render(request, "english/collocation_entry.html", vars)

def collocation_view(request, id):
    word = Collocation.objects.get(id=id)
    word_entry = Word.objects.get(ref_id=word.word+"_"+("1" if word.pos == "verb" else "2" if word.pos == "noun" else "3" if word.pos == "adjective" else "4"))
    fields = word.fields
    vars = {
        "word":word,
        "pronounce":word_entry.pronounce.splitlines if word_entry else "",
        "fields":fields
    }
    return render(request,"english/collocation.html",vars)

def ipa_convert(request):
    return render(request,"english/ipa_converter.html")

def my_words(request):
    get = request.GET
    search_query = get.get("q","").strip()
    search_pos = get.get("pos","").strip()
    search_in = get.get("in","").strip()

    if search_query:
        words = Revise.objects.filter(Q(user=request.user) | Q(word__startswith=search_query) | Q(word__contains=search_query) | Q(pos=search_pos, definition__contains=search_in))
    else:
        words = Fav.objects.filter(user=request.user)
    
    paginator = Paginator(words, 10)  # Show 6 contacts per page.
    page_number = get.get("page") if get.get("page") else 1
    page_navi = int(page_number)-1
    page_obj = paginator.get_page(page_number)

    vars = {
        "wordscount":words.count(),
        "wordsp":page_obj,
        "pagen":page_navi,
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
def revise1(request):
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
    revise = random.choice(items)
    randitem = revise.word
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

    collocation = Collocation.objects.filter(word=randitem.word, pos=randitem.pos).first()
    
    # randnums = random.sample(items, 3) #for more than one item, it contains 3 random objects from the model
    vars = {
        "word":randitem,
        "pronounce":pronounce.splitlines(),
        "forms":forms.splitlines(),
        "example":example,
        "collocation":collocation,
        "rv_total_count":rv_obj.count(),
        "rv_count":rvp_obj.count(),
        "revise":revise
    }
    return render(request, "english/revise.html", vars)

@login_required
def revise(request):
    # file_path = f"languages/english/flashcards/data/users/{request.user.username}.txt"
    # with open(file_path, "r", encoding="UTF-8") as file:
    #     added_words = file.readlines()

    user = request.user
    rv_obj = Revise.objects.filter(user=user)
    if not rv_obj.exists():
        messages.warning(request, "You have not added any words yet!")
        return redirect("words")

    today = datetime.date.today()
    today = today.strftime("%Y-%m-%d")

    rvp_obj = rv_obj.filter(date__lte=today)
    if not rvp_obj.exists():
        messages.warning(request, "You do not have any words due for revision!")
        return redirect("words")
    
    in_rv = list(rvp_obj[0:5])
    items = list(rvp_obj.order_by('-created_at')[0:5])
    in_rv.extend(items)
  
    ''' JS '''
    objs = []
    
    for x in in_rv:
        word = x.word
        if word.pronounce:
            pronounce = x.word.pronounce.splitlines()
        else:
            if word.pos == "verb":
                obj = Word.objects.filter(ref_id=word.word+"_1").first()
                if obj:
                    pronounce = obj.pronounce.splitlines()
                else:
                    pronounce = ["",""]
            elif word.pos == "noun":
                obj = Word.objects.filter(ref_id=word.word+"_2").first()
                if obj:
                    pronounce = obj.pronounce.splitlines()
                else:
                    pronounce = ["",""]
            elif word.pos == "adjective":
                obj = Word.objects.filter(ref_id=word.word+"_3").first()
                if obj:
                    pronounce = obj.pronounce.splitlines()
                else:
                    pronounce = ["",""]
            elif word.pos == "adverb":
                obj = Word.objects.filter(ref_id=word.word+"_4").first()
                if obj:
                    pronounce = obj.pronounce.splitlines()
                else:
                    pronounce = ["",""]
            elif word.pos == "conjunction":
                obj = Word.objects.filter(ref_id=word.word+"_5").first()
                if obj:
                    pronounce = obj.pronounce.splitlines()
                else:
                    pronounce = ["",""]
            else:
                pronounce = ["",""]

        if word.forms:
            forms = x.word.forms
        else:
            if word.pos == "verb":
                obj = Word.objects.filter(ref_id=word.word+"_1").first()
                if obj:
                    forms = obj.forms
                else:
                    forms = ""
            elif word.pos == "noun":
                obj = Word.objects.filter(ref_id=word.word+"_2").first()
                if obj:
                    forms = obj.forms
                else:
                    forms = ""
            else:
                forms = ""

        collocation = Collocation.objects.filter(word=word, pos=word.pos).first()

        objs.append({
            "rv_count":rv_obj.count(),
            "rv_id":x.pk,
            "pk":word.pk,
            "date":x.date.strftime("%Y-%m-%d"),
            "word":word.word,
            "pos":word.pos,
            "grade":word.grade if word.grade else "",
            "word_root":word.word_root,
            "root_pos":word.root_pos,
            "pruk":pronounce[0] if len(pronounce) > 1 else "smt is wrong with prnounce",
            "prus":pronounce[1] if len(pronounce) > 1 else "word id is '{}'".format(word.pk),
            "forms":forms.splitlines(),
            "def_inf":word.def_inf,
            "basic_definition":word.basic_definition,
            "definition":word.definition,
            "definition_hindi":word.definition_hindi,
            "definition_urdu":word.definition_urdu,
            "example":word.example.splitlines() if word.example else "",
            "context":word.context,
            "synonyms":word.synonyms,
            "antonyms":word.antonyms,
            "compare":word.compare,
            "note":x.note,
            "pic_url":word.pic.url if word.pic else "",
            "pic_url_url":word.pic_url,
            "collocation":{"pk":1,"collocation":"nail"} if collocation else None
        })
    # print(objs)

    # randnums = random.sample(items, 3) #for more than one item, it contains 3 random objects from the model
    vars = {
        "objs":json.dumps(objs),
        "rv_total_count":rv_obj.count(),
        "rv_count":rvp_obj.count(),
        "revise":revise
        # "collocation":collocation,
    }
    return render(request, "english/revise.html", vars)

@login_required
def note_edit(request,id):
    if request.method == "POST":
        note = request.POST.get("note")
        word = Revise.objects.get(word_id=id)
        
        word.note = note
        word.save()

        messages.success(request, "The note was edited")
        return HttpResponseRedirect("/english/revise")
    else:
        pass
    return HttpResponseRedirect("/english/revise")

def edit(request):
    data = request.GET
    word_id = data.get('word_id')
    word_obj = Word.objects.get(id=word_id)
    form = WordsForm(instance=word_obj)

    if request.method == "POST":
        datap = request.POST
        data = request.POST.copy()

        get_word_root = data.get('word_root')
        get_word = data.get('word')
        get_pos = data.get('pos')
        get_grade = data.get('grade')

        '''ref id'''
        ref_id = datap.get('ref_id')
        print("ref_id is", get_word)

        if ref_id == "yes":
            if get_pos == "verb":
                ref_id = get_word+"_1"
            elif get_pos == "noun":
                ref_id = get_word+"_2"
            elif get_pos == "adjective":
                ref_id = get_word+"_3"
            elif get_pos == "adverb":
                ref_id = get_word+"_4"
            elif get_pos == "conjunction":
                ref_id = get_word+"_5"
            elif get_pos == "preposition":
                ref_id = get_word+"_7"
        else:
            ref_id = ""

        data.update({"ref_id":ref_id})
        data_form = WordsForm(data or None, instance=word_obj)
        if data_form.is_valid():
            data_form.save()
            messages.success(request,'The word "{}" was edited!'.format(get_word))
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

''' Dictionary '''
from django.db.models import Q
def dictionary(request):
    get = request.GET
    search_query = get.get("q","").strip()
    search_in = get.get("in","").strip()

    if search_query:
        words = Dictionary.objects.filter(Q(word__startswith=search_query) | Q(word__contains=search_query))
    else:
        words = Dictionary.objects.all()

    fav = Fav.objects.filter(user=request.user).values_list('word_id',flat=True)

    paginator = Paginator(words, 10)  # 10 contacts per page.
    page_number = get.get("page") if get.get("page") else 1
    page_navi = int(page_number)-1
    page_obj = paginator.get_page(page_number)

    vars = {
        "wordscount":words.count(),
        "wordsp":page_obj,
        "pagen":page_navi,
        "fav":fav
    }
    return render(request, "english/dictionary_2.html", vars)

''' Word Page'''
def word_main(request,word):
    word = Dictionary.objects.get(pk=word)
    nw = Dictionary.objects.all()[word.pk-4 if word.pk > 3 else 0:word.pk+3]

    # collocation = Collocation.objects.filter(word=word.word, pos=word.pos).first()
    
    vars = {
        "word":word,
        "nw":nw,
        # "collocation":collocation,
    }
    return render(request, "english/word_main.html", vars)

'''Revise'''
def revise_main(request):
    datag = request.GET
    user = request.user
    rv_obj = Fav.objects.filter(user=user)

    if not rv_obj.exists():
        messages.warning(request, "You have not added any words yet!")
        return redirect("words")

    today = datetime.datetime.today()
    # today = today.strftime("%Y-%m-%d")

    rvp_obj = []
    rvp_obj_count = 0
    for x in rv_obj:
        for yn, y in enumerate(x.data["dates"]):
            ydate = datetime.datetime.strptime(y,"%Y-%m-%d")
            if ydate <= today:
                rvp_obj.append([{
                    "pk":x.pk,
                    "rvsense":yn,
                    "wpk":x.pk,
                    "word":x.word.word,
                    "pos":x.word.pos,
                    "cefr":x.word.cefr,
                    "forms":x.word.forms,
                    "pronounciation":x.word.pronounciation
                },
                x.word.senses[yn]
                ])
            rvp_obj_count += 1

        if len(rvp_obj) == 10:
            break
    
    if not rvp_obj:
        messages.warning(request, "You do not have any words due for revision!")
        return HttpResponseRedirect(datag.get("back","/"))
        # return redirect("words")


    # randnums = random.sample(items, 3) #for more than one item, it contains 3 random objects from the model
    vars = {
        "objs":json.dumps(rvp_obj),
        "rv_total_count":rvp_obj_count, #rv_obj.count()+
        "rv_count":len(rvp_obj),
        # "revise":revise
    }
    return render(request, "english/revise_main.html", vars)

'''Revise Actions'''
def data_main(request):
    user = request.user
    data = request.GET
    word = data.get('word')
    sense = int(data.get('sense'))
    word_obj = get_object_or_404(Dictionary, id=word)

    today = datetime.date.today()
    todaystr = today.strftime("%Y-%m-%d")

    if data.get('data') == "mastered":
        entry = Fav.objects.get(id=word, user=user)
        rvcount = entry.data["rvcounts"][sense]
        td = datetime.timedelta(days=30)
        entry.data["dates"][sense] = (today+td).strftime("%Y-%m-%d")
        entry.data["rvcounts"][sense] += 1
        entry.save()
        messages.success(request, f"Great! the word will show up after {rvcount+30} days")
        return HttpResponse(f"Great! the word will show up after {rvcount+30} days")
    
    if data.get('data') == "easy":
        entry = Fav.objects.get(id=word, user=user)
        rvcount = entry.data["rvcounts"][sense]
        td = datetime.timedelta(days=2+rvcount)
        entry.data["dates"][sense] = (today+td).strftime("%Y-%m-%d")
        entry.data["rvcounts"][sense] += 2
        entry.save()
        #messages.success(request, f"Great! the word will show up after {rvcount+2} days")
        return HttpResponseRedirect('/english/revise')
    
    elif data.get('data') == "hard":
        entry = Fav.objects.get(id=word, user=user)
        rvcount = entry.data["rvcounts"][sense]
        td = datetime.timedelta(days=1)
        entry.data["dates"][sense] = (today+td).strftime("%Y-%m-%d")
        entry.data["rvcounts"][sense] -= 1 if rvcount >= 1 else 0
        entry.save()
        #messages.success(request, f"Great! the word will show up after {rvcount+1} days")
        return HttpResponseRedirect('/english/revise')
    
    elif data.get('data') == "remove":
        entry = Fav.objects.get(word=word_obj, user=user)
        entry.delete()
        messages.warning(request, f'The word "{word_obj}" was removed!')
        return HttpResponseRedirect('/english/dictionary')
    
    if data.get('data') == "fav":
        uwords = Fav.objects.filter(user=user, word=word_obj)

        if not uwords.exists():
            if sense == 0:
                dat = {
                    "rvcounts":[],
                    "senses":[],
                    "dates":[],
                    "notes":[]
                }
                for x in range(len(word_obj.senses)):
                    dat["rvcounts"].append(0)
                    dat["senses"].append(x+1)
                    dat["dates"].append(todaystr)
                    dat["notes"].append("")

                Fav.objects.create(user=user, word=word_obj, data=dat)
                messages.success(request, f"the word '{word_obj.word}' was added successfully")
                return HttpResponseRedirect('/english/worddetails/'+word)
            else:
                dat = {
                    "rvcounts":[0],
                    "senses":[sense],
                    "dates":[todaystr],
                    "notes":[""]
                }
                Fav.objects.create(user=user, word=word_obj, data=dat)
                messages.success(request, f"the word '{word_obj.word}' was added successfully")
                return HttpResponseRedirect('/english/worddetails/'+word)
        else:
            rv = uwords.first()
            if sense == 0:
                dat = {
                    "rvcounts":[],
                    "senses":[],
                    "dates":[],
                    "notes":[]
                }
                for x in len(word_obj.senses):
                    if x+1 in rv.data["senses"]:
                        continue
                    else:
                        dat["rvcounts"].append(0)
                        dat["senses"].append(x+1)
                        dat["dates"].append(todaystr)
                        dat["notes"].append("")
                messages.success(request, f"sense '{sense}' of word '{word_obj.word}' was added!")
                return HttpResponseRedirect('/english/worddetails/'+word)

            else:
                if sense in rv.data["senses"]:
                    messages.warning(request, "the word already exists!")
                    return HttpResponseRedirect('/english/worddetails/'+word)
                else:
                    rv.data["rvcounts"].append(0)
                    rv.data["senses"].append(sense)
                    rv.data["dates"].append(todaystr)
                    rv.data["notes"].append("")
                    rv.save()
                    messages.success(request, f"sense '{sense}' of word '{word_obj.word}' was added!")
                    return HttpResponseRedirect('/english/worddetails/'+word)
