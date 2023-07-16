prompt = document.getElementById('prompt');
prm = document.getElementById('prm');


wish = ["Kya Baat Hai!","Badhiya!","Correct!","Right!","Nicely done!","Great!","Yeah!","Cool!"];
sorry = ["Yeh Nahi Tha!","Nahi!","Wrong!","Incorrect!","Sorry!"];


//PROMPT CARD SCREEN
function card_prompt(){
    var vars = arguments;
    var cardm = cards[vars[0]];
    var card_title = cardm.slice(0,cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$')+2,-1)
    var card_content = card_content.split('__');
    var card_count = vars[1]==0?card_content.length:vars[1]; //from arguments
    var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    while (len.includes(randline)){
        var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    }
    var card = card_content[randline];
    var card_listed = card.split(':')
    var word = card.slice(0,card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':')+1,card.length);
    var cards_arr = [word];
    for (x of card_content){
        var y = x.slice(0,x.indexOf(':'));
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
        <div class="flex_center">
            <div class="word">${meaning}
                <div class="tooltiptext">${word}</div>
            </div>
            <span class="caption">की English Translation चुनें</span>
        </div>
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
        var prompt_msg = len.length==card_count-1?`You can go to the next Page!`:wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
        
        if (card_listed.includes(thiss.text())){
            len.push(randline);
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = prompt_msg;
        }else{
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
        if (len.length==card_count){
            navigation_b.innerHTML = `
            <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')" onmousedown="clkk()">Prev</div>
            <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
            </div>
            `;
            len = [];
        }else if (vars[3]==1){
            navigation_b.innerHTML = `
            <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')" onmousedown="clkk()">Prev</div>
            <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
            </div>
            `;
        }else{
            navigation_b.innerHTML = "";
        }

        window[`master_${vars[2]}`]();
    });
}

function hv_prompt(){
    var vars = arguments;
    var cardm = cards[vars[0]];
    var card_title = cardm.slice(0,cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$')+2,-1)
    var card_content = card_content.split('__');
    var card_count = vars[1]==0?card_content.length:vars[1]; //from arguments
    var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    while (len.includes(randline)){
        var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    }
    var card = card_content[randline];
    var card_listed = card.split(':')
    var word = card.slice(0,card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':')+1,card.length);
    var cards_arr = [];
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
        <div class="flex_center">
            <div class="word">${word}
                <div class="tooltiptext">${meaning}</div>
            </div>
            <span class="caption">की Helping Verb चुनें</span>
        </div>
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
        var prompt_msg = len.length==card_count-1?`You can go to the next Page!`:wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
        
        if (card_listed.includes(thiss.text())){
            len.push(randline);
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = prompt_msg;
        }else{
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
        if (len.length==card_count){
            navigation_b.innerHTML = `
            <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')" onmousedown="clkk()">Prev</div>
            <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
            </div>
            `;
            len = [];
        }else if (vars[3]==1){
            navigation_b.innerHTML = `
            <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')" onmousedown="clkk()">Prev</div>
            <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
            </div>
            `;
        }else{
            navigation_b.innerHTML = "";
        }

        window[`master_${vars[2]}`]();
    });
}

function translate_lvlbeg(){
    var vars = arguments;
    var cardm = cards[vars[0]];
    var card_title = cardm.slice(0,cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$')+2,-1)
    var card_content = card_content.split('__');
    var len_cards = card_content.length;
    var randline = Math.floor(Math.random() * (len_cards));
    var card = card_content[randline];
    // var card_title = card.slice(0,card.indexOf('$$'))
    var card_h = card.slice(card.indexOf(':')+1,card.length);
    var card_order = card.slice(0,card.indexOf(':')).split(' ');
    var card_s = card.slice(0,card.indexOf(':')).split(' '); //card_content.split('$$');
    var card_s = card_s.sort(function(){return 0.5 - Math.random()});

    var meaning = ``;
    var cas = [];
    for (x in card_s){
        var mean = card_s[x];
        cas.push('#btn_'+x);
        meaning += `
        <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
        `;
    }
    
    body.innerHTML = `        
    <div class="content">
    <div id="cardm" class="cardm_learn">
    <div class="trans">
    <div class="flex_center"><h1>${card_h}</h1></div>
    <div class="line"></div>
    <div class="flex_center">${meaning}</div>
    </div>
    <div id="check">Check</div>
    </div>
    `;

    var buttons_array = [];
    
    $('button').on('click', function(){
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();
        
        if (buttons_array.includes(thiss_text)){
            buttons_array.splice(buttons_array.indexOf(thiss_text),1);
            for (x in buttons_array){
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color':'#cccccc',
                'color':'#222222'
            })
            if (buttons_array.length==0){
                $('#check').css({
                    'display':'none'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }else{
            buttons_array.push(thiss_text);
            for (x in buttons_array){
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color':'rgb(60, 179, 114, 0.95)',
                'color':'#f1f1f1'
            })
            if (buttons_array.length>0){
                $('#check').css({
                    'display':'inline-block'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }

        
        document.querySelector('#inf').innerHTML = `
            <div class="inf">
                <div></div>
                <div>Unit ${unit} - (Page: ${num})</div>
                <div id="tt"></div>
            </div>
        `;
    });
    
    $('#check').on('click', function(){
        if (buttons_array.join()==card_order.join()){
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            window[`master_${vars[2]}`]();
        }else{
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}
function translate_lvlint(){
    var vars = arguments;
    var cardm = cards[vars[0]];
    var card_title = cardm.slice(0,cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$')+2,-1)
    var card_content = card_content.split('__');
    var len_cards = card_content.length;
    var randline = Math.floor(Math.random() * (len_cards));
    var card = card_content[randline];
    // var card_title = card.slice(0,card.indexOf('$$'))
    var card_h = card.slice(card.indexOf(':')+1,card.length);
    var card_order = card.slice(0,card.indexOf(':')).split(' ');
    var card_s = card.slice(0,card.indexOf(':')).split(' '); //card_content.split('$$');
    var card_s = card_s.sort(function(){return 0.5 - Math.random()});
    {//conf pushing
    var crdl = card_s.map(word => word.toLowerCase());//converting the entire array(card_s) to lowercase
    if (crdl.includes('are') || crdl.includes('am')){
        card_s.push('is')
    }else{
        card_s.push('are');
    }
    
    if (crdl.includes('this')){
        card_s.push('these');
        card_s.push('that');
    }else if (crdl.includes('these')){
        card_s.push('this');
        card_s.push('those');
    }

    if (crdl.includes('have')){
        card_s.push('has');
    }
    }
    var meaning = ``;
    var cas = [];
    for (x in card_s){
        var mean = card_s[x];
        cas.push('#btn_'+x);
        meaning += `
        <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
        `;
    }
    
    body.innerHTML = `        
    <div class="content">
    <div id="cardm" class="cardm_learn">
    <div class="trans">
    <div class="flex_center"><h1>${card_h}</h1></div>
    <div class="line"></div>
    <div class="flex_center">${meaning}</div>
    </div>
    <div id="check">Check</div>
    </div>
    `;

    var buttons_array = [];
    
    $('button').on('click', function(){
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();
        
        if (buttons_array.includes(thiss_text)){
            buttons_array.splice(buttons_array.indexOf(thiss_text),1);
            for (x in buttons_array){
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color':'#cccccc',
                'color':'#222222'
            })
            if (buttons_array.length==0){
                $('#check').css({
                    'display':'none'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }else{
            buttons_array.push(thiss_text);
            for (x in buttons_array){
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color':'rgb(60, 179, 114, 0.95)',
                'color':'#f1f1f1'
            })
            if (buttons_array.length>0){
                $('#check').css({
                    'display':'inline-block'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }

        
        document.querySelector('#inf').innerHTML = `
            <div class="inf">
                <div></div>
                <div>Unit ${unit} - (Page: ${num})</div>
                <div id="tt"></div>
            </div>
        `;
    });
    
    $('#check').on('click', function(){
        if (buttons_array.join()==card_order.join()){
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            master_4();
        }else{
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}
function tip(){
    var len_arg = arguments.length;
    var last_arg_str = arguments[len_arg-1];

    switch (len_arg){
        case 3:
            break;
        case 2:
            if (arguments[0]==1){
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(60, 179, 114, 0.95)";
                prm.style.animation = "prm 1.5s ease 0ms 1 normal forwards";
                prm.innerHTML = `Correct`;
                window["master_"+last_arg_str](); //function runner
            }else{
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(85, 85, 85, 0.95)";
                prm.style.animation = "prm 1.5s ease 0ms 1 normal forwards";
                prm.innerHTML = "Incorrect!";
            }
            break;
        case 1:
            if (arguments[0]==arguments[1]){
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(60, 179, 114, 0.95)";
                prm.innerHTML = `Correct`;
                if (arguments[2]==1){
                    navigation_b.innerHTML = `
                        <div class="inff" id="inff">
                            <div class="button" onclick="navigate('prev')">Prev</div>
                            <div class="button" onclick="window.location.assign('2')" onmousedown="clkk()">Next</div>
                        </div>
                    `;
                }else{
                    navigation_b.innerHTML = `
                        <div class="inff" id="inff">
                            <div class="button" onclick="navigate('prev')">Prev</div>
                            <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
                        </div>
                    `;

                }
            }else{
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(85, 85, 85, 0.95)";
                prm.innerHTML = "Incorrect!";
            }
            break;
    }

}
//PROMPT SCREEN
function clk(){
    processval = (process.length > 3) ? `You can now go to the next page`:`Right!`;

    if (en.vowels.includes(arguments[0])){
        if (process.includes(arguments[0]) == false){
            process.push(arguments[0])
        }
        prompt.style.display = "block";
        prm.style.backgroundColor = "rgb(60, 179, 113)";
        prm.innerHTML = `${processval}`;
    }else{
        prompt.style.display = "block";
        prm.style.backgroundColor = "#555";
        prm.innerHTML = "Wrong!";
    }
}

function clkk(){
    prompt.style.display = "none";
} // important as it makes the prompt display again if not executed prompt wouldn't work