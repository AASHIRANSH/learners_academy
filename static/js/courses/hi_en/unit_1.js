// UNIT/LESSON VARIABLES
unit = 1;
lesson = 1;

en = {
    alphabet:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    consonants:["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"],
    vowels:["a","e","i","o","u"]
};

// FUNCTIONS/LESSONS
function masters() {
    var vars = arguments;
    var masters_list = [
        function () {//1. WRD1 STUDENT
            var x = english.words.w_1.word;
            var y = [0, 0];
            var z = ["school"];
            wcard_prompt_beg(x, y, z, 1, 0);
        },
        function () {//2. BTN1 STUDENT
            var x = english.words.w_1.word;
            var y = [0, 0];
            var z = ["school"];
            wbutton_prompt_reverse(x, y, z, 2, 0);
        },
        function (){//3.  I Card_prompt
            var x = english.pronouns.i.word;
            var y = [0,0];
            card_prompt_beg_img(x,y,0,4,0);
        },
        function (){//4. 
            var x = english.pronouns.i.word;
            var y = [0,0];
            button_prompt_reverse(x,y,0,5,0);
        },
        // function (){//3. SUBJECT definition
        //     var card_title = `SUBJECT`;
        //     navig(1);
        //     body.innerHTML = `
        //         <div class="inf">
        //             <div>lesson - ${unit}</div>
        //             <div class="main">${card_title}</div>
        //             <div>page: ${num + 1}</div>
        //         </div>
        //         <div id="content" class="content">
        //             <div id="cardm" class="cardm_learn">
        //                 ${english.subject_def}
        //             </div>
        //         </div>
        //     `;
        // },
        // function (){//6. 
        //     navig(1);
        //     var card_title = "Present Simple";
        //     body.innerHTML = `
        //         <div class="inf">
        //             <div>Unit - ${unit}</div>
        //             <div class="main">${card_title}</div>
        //             <div>Lesson: ${num + 1}</div>
        //         </div>
        //         <div class="content">
        //             <div id="cardm" class="cardm_learn">
        //                 <div class="flex_column">
        //                     <div class="flex_center"><h1 class="color_primary">PRESENT SIMPLE</h1></div>
        //                     <div class="flex_center text_20">(affirmative)</div>
        //                     <hr>
        //                 </div>
        //                 <ul class="square">
        //                     <li>मौजूदा वक्त(present time) में बात करते हुए जब किसी शख्स(person) या चीज़(thing) का Introduction(परिचय) कराया जाता है। जैसे:- <em>आप अध्यापक हो, हम छात्र हैं, वह मेरा दोस्त है</em> etc.</li>
        //                 </ul>
        //                 <ul class="square">
        //                     <li>ऐसे Sentences(वाक्य) को Present Simple कहते हैं और ऐसे Sentences में SUBJECT के साथ <a href="">Helping Verbs</a> (is, am, are) में से कोई एक use करते हैं।</li>
        //                 </ul>
        //                 <div class="flex_column">
        //                     <div class="flex_sp">
        //                         <div><ul>
        //                             <li>I am</li>
        //                             <li>You are</li>
        //                             <li>We are</li></ul>
        //                         </div>
        //                         <div><ul>
        //                             <li>He is</li> 
        //                             <li>She is</li>
        //                             <li>They are</li></ul>
        //                         </div>
        //                         <div><ul>
        //                             <li>it is</li>
        //                             <li>this is</li>
        //                             <li>these are</li></ul>
        //                         </div>
        //                         <div><ul>
        //                             <li>that is</li>
        //                             <li>those are</li></ul>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <span class="text_25">I के साथ "am", You के साथ "are" बाकी सभी singulars के साथ "is" और plurals के साथ "are" का use करते हैं।</span>
        //                 <div class="flex_center"><h2 class="bg_grey p_10 bdr_r_8">Formula: [ Subject + Helping Verb + Object(information) ]</h2></div>
        //             </div>
        //         </div>
        //     `;
        // },
        function (){//5. 
            let xx = english.pronouns.i.sentences.affirmative.slice(0,1);
            let x = xx.concat(english.words.w_1.sentences.affirmative.slice(0,1));
            let y = [0,0];
            let z = 'english.subject_def';
            translate_beg(x,y,z,7,0);
        },
        function (){//6. 
            var x = english.present_simple.hv;
            var y = [0,1];
            hv_prompt(x,y,0,8,0);
        },
        function () {//9. WRD2 STUDENT
            var x = english.words.w_2.word;
            var y = [0, 0];
            var z = ["school"];
            wcard_prompt_beg(x, y, z, 9, 0);
        },
        function () {//10. BTN2 STUDENT
            var x = english.words.w_2.word;
            var y = [0, 0];
            wbutton_prompt_reverse(x, y, 0, 10, 0);
        },
        function (){
            var xx = english.pronouns.i.sentences.affirmative.slice(1,2);
            var x = xx.concat(english.words.w_2.sentences.affirmative.slice(0,1));
            var y = [0,0];
            translate_beg(x,y,0,14,0);
        },
        function () {
            let x = english.pronouns.pronouns;
            let y = [0,0];
            match_prompt(x, y, 0, 18, 1);
        },
    ];
    masters_list[vars[0]]();
    maxNum = masters_list.length - 1;
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
    <div id="content" class="content">
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
                    <div>Unit - ${unit} (Page: ${num + 1})</div>
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
    <div id="content" class="content">
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
    <div id="content" class="content">
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
    <div id="content" class="content" class="animate__animated animate__fadeIn">
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
    <div id="content" class="content">
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
    <div id="content" class="content">
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
    <div id="content" class="content">
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
    <div id="content" class="content">
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