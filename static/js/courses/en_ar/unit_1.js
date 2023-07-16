// UNIT/LESSON VARIABLES
unit = 1;
num = 1;

ar = {
    alphabet:["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","و","ه","ء","ى"]
}


// POSTINGS/ERRORS
errors = []; //lists the errors/mistakes made by the user and in the end post them into a database so as to make the user revise them later


// FUNCTIONS/LESSONS
var len = [];
function master_1(){
    card_prompt(0,3,1);
}//subjects
function master_2(){
    card_prompt(1,0,2,0);
}//words
function master_3(){
    body.innerHTML = `        
    <div class="content">
        <div id="cardm" class="cardm_learn">
            <div class="flex_center"><h1>PRESENT SIMPLE</h1></div>
            <span>किसी भी sentence में जिसे हम लिखते या बोलते हैं उसमें जिस शख्स(person) या चीज़(thing) के बारे में बात करते हैं, उसको SUBJECT कहते हैं।</span>
            <span>जैसे:- "Shahzad is a nice person" में "Shahzad=शहज़ाद", "She is a girl" में "she=वह", "I am a teacher" में "I=मैं" और "My brother is a scientist" में "My brother=मेरा भाई"</span>
            
            <span>मौजूदा वक्त(present time) में किसी भी व्यक्ति(person) या चीज़(thing) के बारे में बात करते हुए उस व्यक्ति या चीज़ के नाम(name) के बाद <a href="">Helping Verbs</a>(is, am, are) में से कोई एक use करते हैं।</span>
            
            <span>Helping Verbs के use का आसान तरीका यह है कि... I के साथ "am", You के साथ "are" बाकी सभी singulars के साथ "is" और plurals के साथ "are" का use करें।</span>
        </div>
    </div>
    `;
}//hv def
function master_4(){
    hv_prompt(2,0,4,0);
}//words
function master_5(){
    translate_lvlbeg(4,0,5,0);
}//trans

function master_nan(){
    body.innerHTML = `        
    <div class="content">
        <div id="cardm" class="cardm_learn">
            <div class="flex_center"><h1>PRESENT SIMPLE</h1></div>
            <span>मौजूदा वक्त(present time) में किसी भी व्यक्ति(person) या चीज़(thing) के बारे में बात करते हुए उस व्यक्ति या चीज़ के नाम(name) के बाद <a href="">Helping Verbs</a>(is, am, are) में से कोई एक use करते हैं।</span>
            <div class="flex_column">
                <h2>For example:</h2>
                <div class="flex_sp">
                    <div><ul>
                        <li>I am</li>
                        <li>You are</li>
                        <li>We are</li></ul>
                    </div>
                    <div><ul>
                        <li>He is</li> 
                        <li>She is</li>
                        <li>They are</li></ul>
                    </div>
                    <div><ul>
                        <li>it is</li>
                        <li>this is</li>
                        <li>these are</li></ul>
                    </div>
                    <div><ul>
                        <li>that is</li>
                        <li>those are</li></ul>
                    </div>
                </div>
            </div>
            <span>Helping Verbs के use का आसान तरीका यह है कि... I के साथ "am", You के साथ "are" बाकी सभी singulars के साथ "is" और plurals के साथ "are" का use करें।</span>
        </div>
    </div>
    `;
}//hv def complete reference
function master_nan(){
    var cardm = cards[3];
    var card_title = cardm.slice(0,cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$')+2,-1)
    var card_content = card_content.split('__');
    var len_cards = card_content.length;
    var randline = Math.floor(Math.random() * (len_cards));
    var card = card_content[randline];
    // var card_title = card.slice(0,card.indexOf('$$'))
    var card_h = card.slice(0,card.indexOf(':'));
    var card_order = card.slice(card.indexOf(':')+1,card.length).split(' ');
    var card_s = card.slice(card.indexOf(':')+1,card.length).split(' '); //card_content.split('$$');
    var card_s = card_s.sort(function(){return 0.5 - Math.random()});
    var progress = "";
    // var mean = card_content[randline].slice(br+2);
    
    var meaning = ``;
    var cas = [];
    for (x in card_s){
        var mean = card_s[x];
        cas.push('#btn_'+x);
        meaning += `
        <button style="position:relative;top:150px;" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
        `;
    }
    
    body.innerHTML = `        
    <div class="content">
    <div id="cardm" class="cardm_learn">
    <div class="trans">
    <div class="flex_center"><h1>${card_h}</h1></div>
    <div class="line">${meaning}</div>
    <div class="flex_center"></div>
    </div>
    </div>
    `;

    var order = [];
    var width_order = [];
    var width_num = 0;
    
    $('button').on('click', function(){
        if (order.length==0){
            width_order = [];
        }
        var thiss = $(this);
        var thiss_val = thiss.val();
        if (order.includes(thiss_val)){
            order.splice(order.indexOf(thiss_val),1);
            thiss.css({'position':'absolute', 'top':'150px', 'order': '0'});
            document.getElementById('inf').innerHTML = `
                <div class="inf">
                    <div></div>
                    <div>Unit - ${unit} (Page: ${num})</div>
                    <div id="tt"></div>
                </div>
            `;
            if (card_order==order.join()){
                xx = 1;
                yy = 1;
            }else{
                xx = 1;
                yy = 0;
            }
            navigation_b.innerHTML = `
                <div class="inff" id="inff">
                    <div class="button" onclick="navigate('prev')">Prev</div>
                    <div class="button" onclick="card_prompt(${xx},${yy})" onmousedown="clkk()">Next</div>
                </div>
            `;
        }else{
            if (width_order.length == 0){
                var width = 0;
                width_num = 0;
                width_val = 0;
            }else{
                var width = document.querySelector('#'+width_order[width_order.length-1]).offsetWidth;
                width_num += width+8;
                width_val = width_num+'px';
            }
            order.push(thiss.val());
            width_order.push(thiss.attr('id'));
            thiss.css({
                'position': 'absolute',
                'top': '0',
                'left': width_val,
                'order': order.length+1
            });
            document.getElementById('inf').innerHTML = `
                <div class="inf">
                    <div></div>
                    <div>Unit - ${width_order} (Page: ${card_order==order.join()})</div>
                    <div id="tt"></div>
                </div>
            `;
            if (card_order==order.join()){
                xx = 1;
                yy = 1;
            }else{
                xx = 1;
                yy = 0;
            }
            navigation_b.innerHTML = `
                <div class="inff" id="inff">
                    <div class="button" onclick="navigate('prev')">Prev</div>
                    <div class="button" onclick="card_prompt(${xx},${yy})" onmousedown="clkk()">Next</div>
                </div>
            `;
        }
    });
}
function master_nan(){
    var cardm = cards[2];
    var card_title = cardm.slice(0,cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$')+2,-1)
    var card_content = card_content.split('__');
    var len_cards = card_content.length;
    var randline = Math.floor(Math.random() * (len_cards));
    var card = card_content[randline];
    // var card_title = card.slice(0,card.indexOf('$$'))
    var card_h = card.slice(0,card.indexOf(':'));
    var card_order = card.slice(card.indexOf(':')+1,card.length).split(' ');
    var card_s = card.slice(card.indexOf(':')+1,card.length).split(' '); //card_content.split('$$');
    var card_s = card_s.sort(function(){return 0.5 - Math.random()});
    var progress = "";
    // var mean = card_content[randline].slice(br+2);
    
    var meaning = ``;
    var cas = [];
    for (x in card_s){
        var mean = card_s[x];
        cas.push('#btn_'+x);
        meaning += `
        <button style="position:absolute;top:150px;left:${x*13}%;" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
        `;
    }
    
    body.innerHTML = `        
    <div class="content">
    <div id="cardm" class="cardm_learn">
    <div class="trans">
    <div class="flex_center"><h1>${card_h}</h1></div>
    <div class="line">${meaning}</div>
    <div class="flex_center">
    
    </div>
    </div>
    </div>
    `;

    var order = [];
    var width_order = [];
    var width_num = 0;
    
    $('button').on('click', function(){
        if (order.length==0){
            width_order = [];
        }
        var thiss = $(this);
        var thiss_val = thiss.val();
        if (order.includes(thiss_val)){
            order.splice(order.indexOf(thiss_val),1);
            thiss.css({'position':'absolute', 'top':'150px', 'order': '0'});
            document.getElementById('inf').innerHTML = `
                <div class="inf">
                    <div></div>
                    <div>Unit - ${unit} (Page: ${num})</div>
                    <div id="tt"></div>
                </div>
            `;
            if (card_order==order.join()){
                xx = 1;
                yy = 1;
            }else{
                xx = 1;
                yy = 0;
            }
            navigation_b.innerHTML = `
                <div class="inff" id="inff">
                    <div class="button" onclick="navigate('prev')">Prev</div>
                    <div class="button" onclick="card_prompt(${xx},${yy})" onmousedown="clkk()">Next</div>
                </div>
            `;
        }else{
            if (width_order.length == 0){
                var width = 0;
                width_num = 0;
                width_val = 0;
            }else{
                var width = document.querySelector('#'+width_order[width_order.length-1]).offsetWidth;
                width_num += width+8;
                width_val = width_num+'px';
            }
            order.push(thiss.val());
            width_order.push(thiss.attr('id'));
            thiss.css({
                'position': 'absolute',
                'top': '0',
                'left': width_val,
                'order': order.length+1
            });
            document.getElementById('inf').innerHTML = `
                <div class="inf">
                    <div></div>
                    <div>Unit - ${width_order} (Page: ${card_order==order.join()})</div>
                    <div id="tt"></div>
                </div>
            `;
            if (card_order==order.join()){
                xx = 1;
                yy = 1;
            }else{
                xx = 1;
                yy = 0;
            }
            navigation_b.innerHTML = `
                <div class="inff" id="inff">
                    <div class="button" onclick="navigate('prev')">Prev</div>
                    <div class="button" onclick="card_prompt(${xx},${yy})" onmousedown="clkk()">Next</div>
                </div>
            `;
        }
    });
}//floating buttons
function master_nan(){
    var cardm = cards[1];
    var card_title = cardm.slice(0,cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$')+2,-1)
    var card_content = card_content.split('__');
    // var arg = arguments[0]==undefined?0:arguments[0];
    var card = card_content[Math.floor(Math.random() * (3 - 0)) + 0];
    var card_listed = card.split(':')
    var word = card.slice(0,card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':')+1,card.length);
    var cards_arr = [word];
    for (x of card_content){
        var y = x.slice(x.indexOf(':')+1,x.length);
        if (cards_arr.includes(y)==false){
            cards_arr.push(y);
        }
        if (cards_arr.length==4){
            break;
        }
    }
    cards_arr.sort(function(){return 0.5 - Math.random()}); // Orders randomly an array
    
    var criteria = [];
    for (x in cards_arr){
        if (card_listed.includes(cards_arr[x])){
            criteria.push(1);
        }else{
            criteria.push(0);
        }
    }
    body.innerHTML = `        
    <div class="content">
    <div id="cardm" class="card_4">
    <div class="nav_1">
    <span class="word">${word}</span>
    <span class="caption">की Helping Verb चुनें</span>
    </div>
    <div class="nav_2">
    <div onmousedown="clkk()" class="card">${cards_arr[0]}</div>
    <div onmousedown="clkk()" class="card">${cards_arr[1]}</div>
    <div onmousedown="clkk()" class="card">${cards_arr[2]}</div>
    <div onmousedown="clkk()" class="card">${cards_arr[3]}</div>
    </div>
    </div>
    </div>
    `;

    $('.card').on('click', function(){
        var thiss = $(this);
        var thiss_val = thiss.val();

        if (card_listed.includes(thiss.text())){
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
        }else{
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
        window["master_3"]();
    });
}
function master_nan(){
    var title = "English Alphabet में कितने Vowels होते हैं?"
    var criteria = en.vowels.length;
    ex_vow = [6,21,5,26];
    ex_vow.sort(function(){return 0.5 - Math.random()}); // Orders randomly an array

    body.innerHTML = `        
    <div class="content">
        <div id="cardm" class="card_4">
            <div class="nav_1">
                <span>${title}</span>
            </div>
            <div class="nav_2">
                <div onclick="card_prompt(${criteria},${ex_vow[0]})" onmousedown="clkk()" class="card">${ex_vow[0]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[1]})" onmousedown="clkk()" class="card">${ex_vow[1]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[2]})" onmousedown="clkk()" class="card">${ex_vow[2]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[3]})" onmousedown="clkk()" class="card">${ex_vow[3]}</div>
            </div>
        </div>
    </div>
    `;
    navigation_b.innerHTML = `
        <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')">Prev</div>
            <div class="button" onclick="master_4()" onmousedown="clkk()">Next</div>
        </div>
    `;
}//vowel exercise
function master_nan(){
    alpha = "";
    
    for (x in en.alphabet){
        alpha += `
        <button>${en.alphabet[x]}</button>
        `;
    }
    
    body.innerHTML = `
    <div class="content" class="animate__animated animate__fadeIn">
        <div id="cardm" class="cardm_learn"><span title="The group of the letters from A to Z in English is called Alphabet.">English में A से Z तक के अक्षरों के Group को Alphabet कहते हैं, जिनकी कुल संख्या 26 है।</span>
            <div class="flex_center"><h2>Capital Letters</h2></div>
            <div class="flex_center">${alpha.toUpperCase()}</div>
            <div class="flex_center"><h2>Small Letters</h2></div>
            <div class="flex_center">${alpha.toLowerCase()}</div>
        </div>
    </div>
    `;
}
function master_nan(){
    var conso = "";
    var vow = "";

    for (c in en.consonants){
        conso += `
        <button>${en.consonants[c]}</button>
        `;
    }
    for (v in en.vowels){
        vow += `
        <button>${en.vowels[v]}</button>
        `;
    }
    
    body.innerHTML = `        
    <div class="content">
        <div id="cardm" class="cardm_learn">
            <span>Alphabet के 26 Letters में से 21 को Consonants और अन्य 5 को Vowels कहते हैं।</span>
            <div class="flex_center"><h2>Consonants</h2></div>
            <div class="flex_center">${conso.toUpperCase()}</div>
            <div class="flex_center"><h2>Vowels</h2></div>
            <div class="flex_center">${vow.toUpperCase()}</div>
        </div>
    </div>
    `;
}
function master_nan(){
    var process = [];
    var a = en.alphabet;
    a.sort(function(){return 0.5 - Math.random()}); // Orders randomly an array
    var alpharand = "";

    for (x in a){
        var x = a[x]
        alpharand += `
        <button onmousedown="clkk()" class="nfocus" value="${x}">${x}</button>
        `;
    }

    body.innerHTML = `        
    <div class="content">
        <div id="cardm" class="cardm_learn">
            <span>नीचे दिए गए Letters में से Vowels को चुनें</span>
            <div class="flex_center">${alpharand}</div>
        </div>
    </div>
    `;
    
    $('button').on('click', function(){
        if ( process.length > 3 ){
            navigation_b.innerHTML = `
                <div class="inff" id="inff">
                    <div class="button" onclick="navigate('prev')">Prev</div>
                    <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
                </div>
            `;
            var processval = `You can go to next page!`;
        }else{
            var processval = `Right!`;
        }
        var thiss = $(this);
        var thiss_val = thiss.val();

        if (en.vowels.includes(thiss_val)){
            if (process.includes(thiss_val) == false){
                process.push(thiss_val);
            }
            prompt.style.display = "block";
            prm.style.backgroundColor = "rgb(60, 179, 113)";
            prm.innerHTML = `${processval}`;
        }else{
            prompt.style.display = "block";
            prm.style.backgroundColor = "#555";
            prm.innerHTML = "Wrong!";
        }
    });
    navigation_b.innerHTML = `
        <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')">Prev</div>
            <div class="button" onclick="master_3()" onmousedown="clkk()">Next</div>
        </div>
    `;
}
function master_nan(){
    var title = "English Alphabet में कितने Consonants होते हैं?"
    var criteria = en.consonants.length;
    ex_vow = [6,21,5,26];
    ex_vow.sort(function(){return 0.5 - Math.random()}); // Orders randomly an array

    body.innerHTML = `        
    <div class="content">
        <div id="cardm" class="card_4">
            <div class="nav_1">
                <span>${title}</span>
            </div>
            <div class="nav_2">
                <div onclick="card_prompt(${criteria},${ex_vow[0]})" onmousedown="clkk()" class="card">${ex_vow[0]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[1]})" onmousedown="clkk()" class="card">${ex_vow[1]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[2]})" onmousedown="clkk()" class="card">${ex_vow[2]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[3]})" onmousedown="clkk()" class="card">${ex_vow[3]}</div>
            </div>
        </div>
    </div>
    `;
    navigation_b.innerHTML = `
        <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')">Prev</div>
            <div class="button" onclick="master_5()" onmousedown="clkk()">Next</div>
        </div>
    `;
}
function master_nan(){
    var title = "English Alphabet में total(कुल) कितने Letters(अक्षर) होते हैं?"
    var criteria = en.alphabet.length;
    ex_vow = [6,21,5,26];
    ex_vow.sort(function(){return 0.5 - Math.random()}); // Orders randomly an array

    body.innerHTML = `
    <div class="content">
        <div id="cardm" class="card_4">
            <div class="nav_1">
                <span>${title}</span>
            </div>
            <div class="nav_2">
                <div onclick="card_prompt(${criteria},${ex_vow[0]},1)" onmousedown="clkk()" class="card">${ex_vow[0]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[1]},1)" onmousedown="clkk()" class="card">${ex_vow[1]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[2]},1)" onmousedown="clkk()" class="card">${ex_vow[2]}</div>
                <div onclick="card_prompt(${criteria},${ex_vow[3]},1)" onmousedown="clkk()" class="card">${ex_vow[3]}</div>
            </div>
        </div>
    </div>
    `;
    navigation_b.innerHTML = `
        <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')">Prev</div>
            <div class="button" onclick="master_6()" onmousedown="clkk()">Next</div>
        </div>
    `;
}

function navigate(pn){
    if (pn=='next'){
        if (num==7){
            num = 7;
        }else{
            num += 1;
        }
        switch (num){
            case 9:
                master_9();
                break;
            case 8:
                master_8();
                break;
            case 7:
                master_7();
                break;
            case 6:
                master_6();
                break;
            case 5:
                master_5();
                break;
            case 4:
                master_4();
                break;
            case 3:
                master_3();
                break;
            case 2:
                master_2();
                break;
            case 1:
                master_1();
                break;
        }
    }

    if (pn=='prev'){
        if (num==1){
            num = 1;
        }else{
            num -= 1;
        }
        switch (num){
            case 10:
                master_10();
                break;
            case 9:
                master_9();
                break;
            case 8:
                master_8();
                break;
            case 7:
                master_7();
                break;
            case 6:
                master_6();
                break;
            case 5:
                master_5();
                break;
            case 4:
                master_4();
                break;
            case 3:
                master_3();
                break;
            case 2:
                master_2();
                break;
            case 1:
                master_1();
                break;
        }
    }
    len = [];
    document.getElementById('inf').innerHTML = `
    <div class="inf">
        <div></div>
        <div>Unit - ${unit} (Page: ${num})</div>
        <div id="tt"></div>
    </div>
    `;
};navigate('prev');