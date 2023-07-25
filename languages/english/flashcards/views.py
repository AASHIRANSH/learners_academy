'''----------- Path Resolve Stable -----------'''
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
'''-------------------------------------------'''
from django.shortcuts import render,redirect, HttpResponse, HttpResponseRedirect
#adding word
from languages.models import Word
from languages.forms import WordsForm
from django.contrib import messages
#-------------------
import random, json


#____________________FlashCard_________________#
flist = ["quran.txt","en_deck.txt","tr_deck.txt","gr_deck.txt","html_deck.txt"]
data_path = "languages/english/flashcards/data/"
len_flist = len(flist)
with open(data_path+flist[1],"rt",encoding='UTF-8') as flcards:
        flines = fflines = flcards.readlines() # listed lines from the deck/db file opened above
    # with open("static/data/html_deck.txt","rt",encoding='UTF-8') as html:
    #     htmlines = html.readlines() # listed lines from the deck/db file opened above

def flashcards(request):
    global fline, flrandline, rfdata          #being used in btneasy()                   
    flistrand = flist[random.randrange(len_flist)]
    with open(data_path+flistrand,"rt",encoding='UTF-8') as flcards:
        flines = flcards.readlines()          # listed lines from the deck/db file opened above
    with open(data_path+"reviserd.txt","rt",encoding='UTF-8') as reviser_for_flash:
        rfdata = reviser_for_flash.read()     # being used to mark the card as added to the reviser
    count = len(flines)                       #total number of items in the list
    flrandline = random.randrange(count)      #random number within the list range
    while f"{flrandline:04n}" in rfdata:
        flrandline = random.randrange(count)
    fline = flines[flrandline]                #random item/line from the list
    #column separator
    col_2 = fline.find("$$")
    col_3 = fline.find("$$",col_2+1)
    #end colum separator
    card_1 = fline[col_2+2:col_3].upper()
    card_2 = fline[col_3+2:]
    bg_class = "infn"
    context = {
        "settings":[],
        "flines":json.dumps(fflines),
        "card_1":card_1,
        "card_2":card_2,
        "line":flrandline+1, #line/card index
        "total":count,
        "bg_class":bg_class
    }
    return render(request,"english/flashcards/flashcards.html",context)


#___________________REVISER_________________#

import datetime
now = datetime.datetime.now() #current date and time

barr = [] #FOR PROGRESS BAR and Cards Calculation
bar = [] #FOR PROGRESS BAR and Cards Calculation

def revise(request):
    rvlist = ["reviser.txt","html_reviser.txt"]
    with open(data_path+rvlist[0],"rt",encoding='UTF-8') as reviserf:
        rvlines = reviserf.readlines() # listed lines of the file opened above
    # with open("static/data/html.txt","rt",encoding='UTF-8') as rvhtml:
    #     rvhtmllines = rvhtml.readlines() # listed lines of the file opened above
    # rvlist = [rvlines,rvhtmllines]
    # rvrand = random.randrange(len(rvlist))
    # if rvrand == 0:
    #     rvlines = rvlines
    # else:
    #     rvlines = rvhtmllines
    len_rvlines = len(rvlines)

    global rlines, rline, memorized, nmemorized, count, rvurl, randline, rvcol_2, rvcol_3, bar_len, rvline
    bar_len = len(bar)

    if len_rvlines == 0:
        count = len_rvlines
        rvcard_1 = "The list is empty!"
        rvcard_2 = "Please add some cards first"
        inf = rvurl = "None"
        bg_class = "infn"
        progress = 100
    else:
        if len_rvlines > 0:
            memorized = []
            nmemorized = []
            for x in rvlines:
                if len(x) > 7:
                    xd = x[2:8]
                    rvcardate = datetime.datetime.strptime(xd,"%y%m%d") #takes the specified string as date object
                    if rvcardate <= now:
                        memorized.append(x)
                else:
                    nmemorized.append(x)
        if len(memorized) > 0:
            inf = rvurl = "postponed"
            rlines = memorized
            count = len(memorized)
            if bar_len == count:
                bar.clear()
            randline = random.randrange(count)
            rvline = rlines[randline]
            while rvline in bar:
                randline = random.randrange(count)
                rvline = rlines[randline]
            bar.append(rvline)
            rline = flines[int(rvline[-5:])]
            #column separator
            rvcol_2 = rline.find("$$")
            rvcol_3 = rline.find("$$",rvcol_2+1)
            #end colum separator
            rvcard_1 = rline[rvcol_2+2:rvcol_3]
            rvcard_2 = rline[rvcol_3+2:-4]
            rvcard_2_ed = rvcard_2
            rvx = rvcard_2.replace(" •","br$•")
            rvx = set(rvx.split("br$"))
            rvcard_2 = rvx

            if len(str(rvcard_2)) < 10:
                display = True
            else:
                display = False
            btnrmv = "inline"
            bg_class = "bg-success"


            bar_len = len(bar)
            barr_len = len(barr)
            prdvd = 100/count
            progress = round(prdvd*(bar_len-1))
            progressbarr = round(prdvd*(barr_len))

        else:
            inf,rvurl = "Normal Reviser","postpone"
            rlines = nmemorized
            count = len(nmemorized)
            if bar_len == count:
                bar.clear()
            randline = random.randrange(count)
            rvline = rlines[randline]
            while rvline in bar:
                randline = random.randrange(count)
                rvline = rlines[randline]
            bar.append(rvline)
            rline = flines[int(rvline[-5:])]
            #column separator
            rvcol_2 = rline.find("$$")
            rvcol_3 = rline.find("$$",rvcol_2+1)
            #end colum separator
            rvcard_1 = rline[rvcol_2+2:rvcol_3]
            rvcard_2 = rline[rvcol_3+2:-4]
            rvcard_2_ed = rvcard_2
            #examples separator
            rvx = rvcard_2.replace(" •","br$•")
            rvx = set(rvx.split("br$"))
            rvcard_2 = rvx

            if len(str(rvcard_2)) < 10:
                display = True
            else:
                display = False
            btnrmv = "none"
            bg_class = "infn"

            bar_len = len(bar)
            barr_len = len(barr)
            prdvd = 100/count
            progress = round(prdvd*(bar_len-1))
            progressbarr = round(prdvd*(barr_len))

    try:
        archecked = request.GET['archecked']
    except:
        archecked = "checked"
    context = {
        "archecked":archecked,
        "progress":progress,
        "progressbarr":progressbarr,
        "inf":inf,
        "total":count,
        "rvtotal":len_rvlines,
        "serial":int(rvline[-5:])+1,
        "serial2":randline+1,
        "card_1":rvcard_1,
        "card_2":rvcard_2,
        "card_2_ed":rvcard_2_ed,
        "link":rvurl, #changes the button function to act on normal reviser and on postponed cards
        "bg_class":bg_class,
        "display":display,
        "displaybtnrmv":btnrmv,
        "bar_len":bar_len
    }
    return render(request,"english/flashcards/revise.html",context)

#_________________BUTTONS_________________________#
class buttons():
    #-------------FLASHCARD BUTTONS----------------
    #ADD NEW CARD
    def add_card(request):
        cad_1 = request.POST['c_1']
        cad_2 = request.POST['c_2']
        print(str(cad_2))
        deck = request.POST['deck']

        with open(data_path+deck+".txt","r",encoding="UTF-8") as cad:
            cad_read = cad.readlines()
            if len(cad_read) == 0:
                num = f"{len(cad_read)+1:04n}"
            else:
                num = f"{len(cad_read)+1:04n}" #initially      f"{int(cad_read[-1][0:4])+1:04n}"
            entry = num+" $$ "+cad_1+" $$ "+cad_2+" $$\n"
            cad_read.append(entry)
        
        with open(data_path+deck+".txt","w",encoding="UTF-8") as cadd:
            cadd.writelines(cad_read)
        
        return HttpResponseRedirect("/flashcards")
        

    def btneasy(request):
        if f"{flrandline:04n}" in rfdata:
            pass
        else:
            with open(data_path+"reviserd.txt","a",encoding="UTF-8") as reviserd:
                wr = f"{flrandline:04n}\n" #converts/formats the number into four decimals "0000"
                reviserd.write(wr)
            with open(data_path+"reviser.txt","a",encoding="UTF-8") as reviserf:
                wr = f"{flrandline:04n}\n" #converts/formats the number into four decimals "0000"
                reviserf.write(wr)
            
        return HttpResponseRedirect("flashcards")


    def btnhard(request):
        with open(data_path+"reviser.txt","a",encoding="UTF-8") as reviserf:
            wr = str(fline).replace("\n",",")
            reviserf.write(wr)
        return render(request,"review.html")
    
    #--------------REVISER BUTTONS------------------
    def postpone(request):
        with open(data_path+"reviser.txt","r",encoding='UTF-8') as rpost:
            rvf = rpost.read()
            date_ext = now + datetime.timedelta(days=6)
            date = date_ext.strftime("%y%m%d")
            x = rvline
            wr = rvf.replace(x,x[:2]+date+"00$"+x[-5:])
        with open(data_path+"reviser.txt","w",encoding='UTF-8') as rpostd:
            rpostd.write(wr)
        return render(request,"redirect.html")

    def postponed(request):
        with open(data_path+"reviser.txt","r+",encoding='UTF-8') as rvppd:
            rvppdd = rvppd.read()
        try:
            pst = int(request.GET['pst'])
        except:
            pst = 0
        day_ext = int(rvline[8:10])+1
        date_ext = now + datetime.timedelta(days=pst+day_ext)
        date = date_ext.strftime("%y%m%d")
        x = rvline
        rp = f"{day_ext:02n}"
        wr = rvppdd.replace(x,x[:2]+date+rp+x[-6:])
        with open(data_path+"reviser.txt","r+",encoding='UTF-8') as rvppdw:
            rvppdw.write(wr)
        return render(request,"redirect.html")

    def remove(request):
        with open(data_path+"reviser.txt","rt",encoding='UTF-8') as rvppd:
            rvppdd = rvppd.read()
        x = rvline
        wr = rvppdd.replace(x,x[7:])
        with open(data_path+"reviser.txt","w",encoding="UTF-8") as reviserf:
            reviserf.write(wr)

    def next(request):
        if randline not in barr:
            barr.append(randline)
        return render(request,"redirect.html")

    #---------------FLMO------------#
    def flmoupdate(request):
        flmolist = []
        for x in rlines:
            flmolist.append(flines[int(x[-5:])])
        
        with open('english/flashcards/flashcardsmo.html','r',encoding='UTF-8') as flmor:
            flmoread = flmor.readlines()
        with open('english/flashcards/flashcardsmo.html','w',encoding='UTF-8') as flmow:
            rep = flmoread[192]
            xep = rep[:19]
            rep = rep.replace(rep,xep+str(flmolist)+";\n")
            flmoread[192] = rep
            # flmow.write(wread.replace(rep,',"'+line.replace('\n','')+'"'+rep)) # adds the card from flashcards to flashcardsmo
            flmow.writelines(flmoread) # adds the entire normal reviser list to flashcardsmo "var cards"
        return render(request,"redirect.html")
    
# --------------------------------------------------------

def fledit(request):
    c_1 = request.POST['c_1']
    c_2 = request.POST['c_2']

    with open(data_path+"en_deck.txt","rt",encoding='UTF-8') as rpost:
        edread = rpost.read()
    x = edread.replace(rline,rline[:rvcol_2+2]+c_1+" $$ "+c_2+" $$\n")
    with open(data_path+"en_deck.txt","w",encoding="UTF-8") as edpost:
        edpost.write(x)
    return render(request,"redirect.html")

def word_entry(request):
    if request.method == "POST":
        datap = request.POST.copy()
        form = WordsForm(request.POST)
        data = request.POST
        # if data.get('definition') in Word.objects.filter(word=word,definition__contains=definition)
        get_word_root = data.get('word_root')
        get_word = data.get('word')
        get_pos = data.get('pos')
        get_grade = data.get('grade')
        
        #data for entry
        category = data.get('category')
        word_root = data.get('word_root')
        root_pos = data.get('root_pos')
        word = data.get('word')
        pos = data.get('pos')
        grade = data.get('grade')
        pronounce = data.get('pronounce')
        def_inf = data.get('def_inf')
        definition = data.get('definition')
        definition_hindi = data.get('definition_hindi')
        forms = data.get('forms')
        example = data.get('example')
        tip = data.get('tip')
        synonyms = data.get('synonyms')
        pic = data.get('pic')
        pic_url = data.get('pic_url')
        
        '''ref id'''
        ref_id = data.get('ref_id')
        if ref_id is None:
            ref_id = ""
        else:
            if pos == "verb":
                ref_id = word+"_1"
            elif pos == "noun":
                ref_id = word+"_2"
            elif pos == "adjective":
                ref_id = word+"_3"
            elif pos == "adverb":
                ref_id = word+"_4"
            elif pos == "conjunction":
                ref_id = word+"_5"

        if form.is_valid():
            entry = Word(
                category=category,
                ref_id=ref_id,
                word_root=word_root,
                root_pos=root_pos,
                word=word,
                pronounce=pronounce,
                pos=pos,
                grade=grade,
                def_inf=def_inf,
                definition=definition,
                definition_hindi=definition_hindi,
                forms=forms,
                example=example,
                tip=tip,
                synonyms=synonyms,
                pic=pic,
                pic_url=pic_url,
            )
            entry.save()
            # form.save()
            messages.success(request, f'the word "{word}" was added')

            # try:
            #     data = data
            # except:
            #     data = None

            vars = {
                "form":form,
                "word_root":get_word_root,
                "word":get_word,
                "pos":get_pos,
                "grade":get_grade,
            }
            return render(request, "english/flashcards/add_card.html", vars)
            # return HttpResponseRedirect('/english/flashcards/addcard')
        else:
            messages.error(request,"there was an error")
    else:
        form = WordsForm()
    vars = {
        "form":form,
        "edit":False,
    }
    return render(request, "english/flashcards/add_card.html", vars)
