var prompt = document.getElementById('prompt');
var prm = document.getElementById('prm');

{//WISH
wish = ["Good Job!", "Badhiya!", "Correct!", "Right!", "Nicely done!", "Great!", "Yeah!", "Cool!"];
wishh = ["LAGATAR 4<br>Kya Baaat Hai!", "LAGATAR 4<br>Aap Achcha Kar Rahe Hain"];
sorry = ["Yeh Nahi Tha!", "Nahi!", "Wrong!", "Incorrect!", "Sorry!"];
sorryy = ["Yeh Nahi Tha!", "Nahi!", "Wrong!", "Incorrect!", "Sorry!"];
}

{//HEADINGS
    headings = ["की English Translation चुनें","की Hindi Translation चुनें","शब्दों के सही जोड़े बनाएं"];
}


num = 0;//used for page navigations
nump = num+1;//used for showing page number
right = 0;//used for counting correct cards
wrong = 0;//used for counting incorrect cards
cards_db = [];
len = [];//used for current page if there are more than one card


{//CARD_PROMPT
    function card_prompt_beg_img() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];//card_title = cardm.slice(0, cardm.indexOf('$$'));
            var card_content = cardm.slice(1)//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var card_count = card_content_les.length; //var card_count = vars[1][1] == 0 ? card_content_les.length : vars[1][1]; //from arguments
            var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var word = card_listed[0];
            var meaning = card_listed[1];
            var word_conf = card_content_les[randline][2];
        }
        textToSpeech(meaning);
        {//generating 4 cards
            var cards_arr = [word];
            for (x of word_conf) {
                var xx = x.split(':');
                cards_arr.push(xx[0]);
                
                if (cards_arr.length == 4) {
                    break;
                }
            }
        }
        cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array

        var criteria = [];
        for (x in cards_arr) {
            if (card_listed.includes(cards_arr[x])) {
                criteria.push(1);
            } else {
                criteria.push(0);
            }
        }

        body.innerHTML = `
            <div class="inf">
                <div class="col-3 fs-4">lesson - ${unit}</div>
                <div class="col-6 text-center fs-3">${card_title}</div>
                <div class="col-3 text-end fs-4">page - ${num + 1}</div>
            </div>
            <div class="container-fluid p-5">
                <div class="d-flex justify-content-center col-12 m-2">${len.length}/${card_count}</div>
                
                <div id="cardm" class="row col-12">
                    <div class="row col-sm-12 col-md-6 mb-5">
                        <div class="d-flex justify-content-center">
                            <div style="cursor:pointer;"><img class="duo-speaker" src="/static/img/svg/loudspeaker_duo.svg" style="scale:0.8"/></div>
                            <div>
                                <div class="word mb-sm-5">${meaning}
                                    <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${word}</div>
                                </div>
                            </div>
                            <span class="caption">${headings[0]}</span>
                        </div>
                        <img src="/static/img/svg/man_norm_eyes_up.svg" class="emot_img"/>
                    </div>

                    <div class="d-sm-block d-md-none mb-5"></div>

                    <div class="col-sm-12 col-md-6">
                        <div class="d-flex justify-content-center">
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="1" value="${cards_arr[0]}">
                                <div class="short">1</div>
                                <img src="/static/img/svg/${cards_arr[0]}.svg" alt="..."/>${cards_arr[0]}
                            </div>
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="2" value="${cards_arr[1]}">
                                <div class="short">2</div>
                                <img src="/static/img/svg/${cards_arr[1]}.svg" alt="..."/>${cards_arr[1]}
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="3" value="${cards_arr[2]}">
                                <div class="short">3</div>
                                <img src="/static/img/svg/${cards_arr[2]}.svg" alt="..."/>${cards_arr[2]}
                            </div>
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="4" value="${cards_arr[3]}">
                                <div class="short">4</div>
                                <img src="/static/img/svg/${cards_arr[3]}.svg" alt="..."/>${cards_arr[3]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;


        $('.card').on('click', function () {
            var thiss = $(this);
            var thiss_text = this.getAttribute('value');

            if (thiss_text == word) {//{(card_listed.includes(thiss.text().slice(2, 20))) {
                len.push(randline);
                cards_db.push(card);
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
                var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
                textToSpeech(word);
            } else {
                if (error_array.includes(vars[3])==false) {
                    error_array.push(vars[3]);//adding the function/lesson into the error array so as to revise it later
                }
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                var prompt_msg = sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            }
            if (len.length == card_count) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        });
    }//shows a question with four cards to given answer from
    function card_prompt_beg() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];//card_title = cardm.slice(0, cardm.indexOf('$$'));
            var card_content = cardm.slice(1, cardm.length)//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var card_count = card_content_les.length; //var card_count = vars[1][1] == 0 ? card_content_les.length : vars[1][1]; //from arguments
            var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var word = card_listed[0];
            var meaning = card_listed[1];
            var word_conf = card_content_les[randline][2];
        }
        textToSpeech(meaning);
        {//generating 4 cards
            var cards_arr = [word];
            for (x of word_conf) {
                var xx = x.split(':');
                cards_arr.push(xx[0]);
                
                if (cards_arr.length == 4) {
                    break;
                }
            }
        }
        cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array

        var criteria = [];
        for (x in cards_arr) {
            if (card_listed.includes(cards_arr[x])) {
                criteria.push(1);
            } else {
                criteria.push(0);
            }
        }

        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            
            <div class="content">
                <div class="flex_center">${len.length}/${card_count}</div>
                <div id="cardm" class="card_4">
                    <div class="nav_1">
                        <div class="flex_center">
                            <div style="cursor:pointer;"><img src="/static/img/svg/loudspeaker_duo.svg" style="scale:0.8"/></div>
                            <div class="word">${meaning}
                                <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${word}</div>
                            </div>
                            <span class="caption">${headings[vars[2]]}</span>
                        </div>
                    </div>
                        <div class="nav_2">
                        <div onmousedown="clkk()" class="card" accesskey="1"><div class="short">1</div>${cards_arr[0]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="2"><div class="short">2</div>${cards_arr[1]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="3"><div class="short">3</div>${cards_arr[2]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="4"><div class="short">4</div>${cards_arr[3]}</div>
                    </div>
                </div>
            </div>
        `;


        $('.card').on('click', function () {
            var thiss = $(this);

            if (card_listed.includes(thiss.text().slice(1, 20))) {
                textToSpeech(word);
                len.push(randline);
                cards_db.push(card);
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
                var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            } else {
                if (error_array.includes(vars[3])==false) {
                    error_array.push(vars[3]);//adding the function/lesson into the error array so as to revise it later
                }
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                var prompt_msg = sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            }
            if (len.length == card_count) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        });
    }//shows a question with four cards to given answer from
    function card_prompt_beg_reverse() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];//card_title = cardm.slice(0, cardm.indexOf('$$'));
            var card_content = cardm.slice(1, cardm.length)//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var card_count = card_content_les.length; //var card_count = vars[1][1] == 0 ? card_content_les.length : vars[1][1]; //from arguments
            var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            }
            var card = card_content_les[randline];
            var card_listed = card.split(':');
            var word = card.slice(0, card.indexOf(':'));
            var meaning = card.slice(card.indexOf(':') + 1, card.length);
        }
        {//generating 4 cards
        var cards_arr = [word];
        for (x of card_content) {
            var y = x.slice(0, x.indexOf(':'));
            if (cards_arr.includes(y) == false) {
                cards_arr.push(y);
            }
            if (cards_arr.length == 4) {
                break;
            }
        }
        cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array
        }

        var criteria = [];
        for (x in cards_arr) {
            if (card_listed.includes(cards_arr[x])) {
                criteria.push(1);
            } else {
                criteria.push(0);
            }
        }

        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div id="img"><img src="/static/img/svg/zari.svg"/></div>
            <div class="content">
                <div class="flex_center">${len.length}/${card_count}</div>
                <div id="cardm" class="card_4">
                    <div class="nav_1">
                        <div class="flex_center">
                            <div class="word">${meaning}
                                <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${word}</div>
                            </div>
                            <span class="caption">${headings[1]}</span>
                        </div>
                    </div>
                        <div class="nav_2">
                        <div onmousedown="clkk()" class="card" accesskey="1"><div class="short">1</div>${cards_arr[0]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="2"><div class="short">2</div>${cards_arr[1]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="3"><div class="short">3</div>${cards_arr[2]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="4"><div class="short">4</div>${cards_arr[3]}</div>
                    </div>
                </div>
            </div>
        `;


        $('.card').on('click', function () {
            var thiss = $(this);

            if (card_listed.includes(thiss.text().slice(1, 20))) {
                len.push(randline);
                cards_db.push(card);
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
                var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            } else {
                if (error_array.includes(vars[3])==false) {
                    error_array.push(vars[3]);//adding the function/lesson into the error array so as to revise it later
                }
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                var prompt_msg = sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            }

            if (len.length == card_count) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        });
    }//reverse "card_prompt" : show the learning language as questions

    function wcard_prompt_multi() {//if there are multiple cards in a single array like before
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];//card_title = cardm.slice(0, cardm.indexOf('$$'));
            var card_content = cardm.slice(1, cardm.length)//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var card_count = card_content_les.length; //var card_count = vars[1][1] == 0 ? card_content_les.length : vars[1][1]; //from arguments
            var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var word = card.slice(0, card.indexOf(':'));
            var meaning = card.slice(card.indexOf(':') + 1, card.length);
        }
        textToSpeech(meaning);
        {//generating 4 cards
            var cards_arr = [word];
            for (x of card_content) {
                var y = x[0].slice(0, x[0].indexOf(':'));
                if (cards_arr.includes(y) == false) {
                    cards_arr.push(y);
                }
                if (cards_arr.length == 4) {
                    break;
                }
            }
            cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array
        }

        var criteria = [];
        for (x in cards_arr) {
            if (card_listed.includes(cards_arr[x])) {
                criteria.push(1);
            } else {
                criteria.push(0);
            }
        }

        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div id="img"><img src="/static/img/svg/zari.svg"/></div>
            <div class="content">
                <div class="flex_center">${len.length}/${card_count}</div>
                <div id="cardm" class="card_4">
                    <div class="nav_1">
                        <div class="flex_center">
                            <div style="cursor:pointer;"><img src="/static/img/svg/loudspeaker_duo.svg" style="scale:0.8"/></div>
                            <div class="word">${meaning}
                                <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${word}</div>
                            </div>
                            <span class="caption">${headings[vars[2]]}</span>
                        </div>
                    </div>
                        <div class="nav_2">
                        <div onmousedown="clkk()" class="card" accesskey="1"><div class="short">1</div>${cards_arr[0]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="2"><div class="short">2</div>${cards_arr[1]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="3"><div class="short">3</div>${cards_arr[2]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="4"><div class="short">4</div>${cards_arr[3]}</div>
                    </div>
                </div>
            </div>
        `;


        $('.card').on('click', function () {
            var thiss = $(this);

            if (card_listed.includes(thiss.text().slice(1, 20))) {
                textToSpeech(word);
                len.push(randline);
                cards_db.push(card);
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
                var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            } else {
                if (error_array.includes(vars[3])==false) {
                    error_array.push(vars[3]);//adding the function/lesson into the error array so as to revise it later
                }
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                var prompt_msg = sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            }
            if (len.length == card_count) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        });
    }//shows a question with four cards to give answer from
    function wcard_prompt_beg() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = "nouns";
            var card_content = cardm;
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var card_count = card_content_les.length; //var card_count = vars[1][1] == 0 ? card_content_les.length : vars[1][1]; //from arguments
            var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var word = card_listed[0];
            var meaning = card_listed[1];
            var word_conf = card_content_les[randline][2];
        }

        textToSpeech(meaning);

        {//generating 4 cards
            var cards_arr = [word];
            var suggest_cards = ydata[vars[2]].sort(function () { return 0.5 - Math.random() });
            for (x of suggest_cards) {
                if (x==card){
                    continue
                }
                cards_arr.push(x[0]);
                
                if (cards_arr.length == 4) {
                    break;
                }
            }
            cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array
        }

        var criteria = [];
        for (x in cards_arr) {
            if (card_listed.includes(cards_arr[x])) {
                criteria.push(1);
            } else {
                criteria.push(0);
            }
        }

        body.innerHTML = `
            <div class="inf">
                <div class="col-3 fs-4">lesson - ${unit}</div>
                <div class="col-6 text-center fs-3">${card_title}</div>
                <div class="col-3 text-end fs-4">page - ${num + 1}</div>
            </div>
            <div class="container-fluid p-5">
                <div class="d-flex justify-content-center col-12 m-2">${len.length}/${card_count}</div>
                
                <div id="cardm" class="row col-12">
                    <div class="row col-sm-12 col-md-6 mb-5">
                        <div class="d-flex justify-content-center">
                            <div style="cursor:pointer;"><img class="duo-speaker" src="/static/img/svg/loudspeaker_duo.svg" style="scale:0.8"/></div>
                            <div>
                                <div class="word mb-sm-5">${meaning}
                                    <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${word}</div>
                                </div>
                            </div>
                            <span class="caption">${headings[0]}</span>
                        </div>
                        <img src="/static/img/svg/man_norm_eyes_up.svg" class="emot_img"/>
                    </div>

                    <div class="d-sm-block d-md-none mb-5"></div>

                    <div class="col-sm-12 col-md-6">
                        <div class="d-flex justify-content-center">
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="1" value="${cards_arr[0]}">
                                <div class="short">1</div>
                                <img src="/static/img/svg/${cards_arr[0]}.svg" alt="..."/>${cards_arr[0]}
                            </div>
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="2" value="${cards_arr[1]}">
                                <div class="short">2</div>
                                <img src="/static/img/svg/${cards_arr[1]}.svg" alt="..."/>${cards_arr[1]}
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="3" value="${cards_arr[2]}">
                                <div class="short">3</div>
                                <img src="/static/img/svg/${cards_arr[2]}.svg" alt="..."/>${cards_arr[2]}
                            </div>
                            <div onmousedown="clkk()" class="card col-sm-6" accesskey="4" value="${cards_arr[3]}">
                                <div class="short">4</div>
                                <img src="/static/img/svg/${cards_arr[3]}.svg" alt="..."/>${cards_arr[3]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;


        $('.card').on('click', function () {
            var thiss = $(this);
            var thiss_text = this.getAttribute('value');

            if (thiss_text == word) {//{(card_listed.includes(thiss.text().slice(2, 20))) {
                textToSpeech(word);
                len.push(randline);
                update_array.push(card);
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
                var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            } else {
                if (error_array.includes(vars[3])==false) {
                    error_array.push(vars[3]);//adding the function/lesson into the error array so as to revise it later
                }
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                var prompt_msg = sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            }
            if (len.length == card_count) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }

            console.log(update_array);
        });
    }//shows a question with four cards to give answer from

    function wpcard_prompt() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];//card_title = cardm.slice(0, cardm.indexOf('$$'));
            var card_content = cardm.slice(1, cardm.length)//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var card_count = card_content_les.length; //var card_count = vars[1][1] == 0 ? card_content_les.length : vars[1][1]; //from arguments
            var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listedd = card.split(':');
            var word = card_listedd[0];
            var meaning = card_listedd[1];
            var plurals = card_content_les[randline][1].split(':');//PLURALS

            if (plurals==""){//generates plural of the word
                var plural = word+"s";
            } else {
                var plural = plurals[0];
            }
            var card_listed = [word,plural];
        }
        textToSpeech(word);
        {//generating 4 cards
            var cards_arr = [word,plural,"",""];
            // for (x=0;x<4;x++) {
            //     if (x==undefined){
            //         cards_arr.push("...");
            //     } else {
            //         cards_arr.push(x);
            //     }
            //     if (cards_arr.length == 4) {
            //         break;
            //     }
            // }
            cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array
        }

        var criteria = [];
        for (x in cards_arr) {
            if (card_listed.includes(cards_arr[x])) {
                criteria.push(1);
            } else {
                criteria.push(0);
            }
        }

        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>

            <div class="content">
                <div class="flex_center">${len.length}/${card_count}</div>
                <div id="cardm" class="card_4">
                    <div class="nav_1">
                        <div class="flex_center">
                            <div style="cursor:pointer;"><img src="/static/img/svg/loudspeaker_duo.svg" style="scale:0.8"/></div>
                            <div class="word">${word}
                                <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${plural}</div>
                            </div>
                            <span class="caption">की <span class="tooltip_c">Plural Form<span class="tooltip_t">एक से ज़्यादा</span></span> क्या है?</span>
                        </div>
                    </div>
                    
                    <div class="nav_2">
                        <div onmousedown="clkk()" class="card" accesskey="1"><div class="short">1</div>${cards_arr[0]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="2"><div class="short">2</div>${cards_arr[1]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="3"><div class="short">3</div>${cards_arr[2]}</div>
                        <div onmousedown="clkk()" class="card" accesskey="4"><div class="short">4</div>${cards_arr[3]}</div>
                    </div>
                </div>
            </div>
        `;


        $('.card').on('click', function () {
            var thiss = $(this);

            if (card_listed.includes(thiss.text().slice(1, 20))) {
                textToSpeech(word);
                len.push(randline);
                cards_db.push(card);
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
                var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            } else {
                if (error_array.includes(vars[3])==false) {
                    error_array.push(vars[3]);//adding the function/lesson into the error array so as to revise it later
                }
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                var prompt_msg = sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0];
                prm.innerHTML = prompt_msg;
            }
            if (len.length == card_count) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        });
    }//shows a question for plural with four cards to given answer from
}

{//BUTTON_PROMPT
    function button_prompt_reverse() {//
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];
            var card_content = cardm.slice(1);
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var len_card_content = card_content_les.length;
            var randline = Math.floor(Math.random() * (len_card_content));
            var progress = Math.round((100 / len_card_content) * len.length);
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var card_h = card_listed[0];
            var card_s = card_listed[1];
            var word_conf = card_content_les[randline][2];
            word_conf.push(card);
            var word_conf = word_conf.sort(function () { return 0.5 - Math.random() });
        }
    
        {//generating buttons from cards array
            var meaning = ``;
            var cas = [];
            for (x in word_conf) {
                var xx = word_conf[x].split(':');
                var mean = xx[1];
                cas.push('#btn_' + x);
                meaning += `
                    <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
                `;
            }
        }
    
        body.innerHTML = `
            <div class="inf">
                <div class="col-3 fs-4">lesson - ${unit}</div>
                <div class="col-6 text-center fs-3">${card_title}</div>
                <div class="col-3 text-end fs-4">page - ${num + 1}</div>
            </div>
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="flex_center">
                        <h1>${card_h}</h1>
                        <span class="ml_20 fs-4">(${headings[1]})</span>
                    </div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id='check' onmousedown='clkk()'>OK</div>
                    </div>
                    <div class="flex_center_wrap">${meaning}</div>
                </div>
            </div>
        `;
    
        var buttons_array = [];
        var id_array = [];
    
        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');
    
            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in buttons_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                //resetting buttons
                buttons_array = [];
                id_array = [];
                $('button').css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })

                //updating buttons
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                buttons += `<button onclick="btn_remove('${thiss_id}')" class="nfocus">${thiss_text}</button>`;
                
                {//loop below lets the .line container add more than one button remove above buttons updating line to use the loop
                    // for (x in buttons_array) {
                    //     if (x==buttons_array.length-1){//last button
                    //         buttons += `<button onclick="btn_remove('${id_array[thiss_id]}')" class="nfocus fade">${buttons_array[thiss_text]}</button>`;
                    //     }else{
                    //         buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    //     }
                    // }
                }
                
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });
    
        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
    
                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };
    
                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//gives all entries of the card unlike "button_promt" which gives only specified entries/criteria
    function button_prompt() {//
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];
            var card_content = cardm.slice(1);
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var len_card_content = card_content_les.length;
            var randline = Math.floor(Math.random() * (len_card_content));
            var progress = Math.round((100 / len_card_content) * len.length);
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var card_h = card_listed[1];
            var card_s = card_listed[0];
            var word_conf = card_content_les[randline][2];
            var word_conf = word_conf.sort(function () { return 0.5 - Math.random() });
        }
    
        {//generating buttons from cards array
            var meaning = `<button style="" onmousedown="clkk()" id="btn_${word_conf.length}" value="${card_s}" class="nfocus">${card_s}</button>`;
            var cas = [];
            for (x in word_conf) {
                var xx = word_conf[x].split(':');
                var mean = xx[0];
                cas.push('#btn_' + x);
                meaning += `
                    <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
                `;
            }
        }
    
        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center">
                        <h1>${card_h}</h1>
                        <span class="ml_20 text_20">(${headings[vars[2]]})</span>
                    </div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id='check' onmousedown='clkk()'>OK</div>
                    </div>
                    <div class="flex_center_wrap">${meaning}</div>
                </div>
            </div>
        `;
    
        var buttons_array = [];
        var id_array = [];
    
        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');
    
            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in buttons_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                //resetting buttons
                buttons_array = [];
                id_array = [];
                $('button').css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })

                //updating buttons
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                buttons += `<button onclick="btn_remove('${thiss_id}')" class="nfocus fade">${thiss_text}</button>`;
                
                {//loop below lets the .line container add more than one button remove above buttons updating line to use the loop
                    // for (x in buttons_array) {
                    //     if (x==buttons_array.length-1){//last button
                    //         buttons += `<button onclick="btn_remove('${id_array[thiss_id]}')" class="nfocus fade">${buttons_array[thiss_text]}</button>`;
                    //     }else{
                    //         buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    //     }
                    // }
                }

                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }

            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });
    
        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });
    
                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };
    
                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//gives all entries of the card unlike "button_promt" which gives only specified entries/criteria
    function button_prompt_single() {
        {//variables
        var vars = arguments;
        var cardm = vars[0];
        card_title = cardm[0];
        var card_content = cardm.slice(1, cardm.length);
        if (vars[1][1]==0){
            var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }else{
            var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }
        var len_card_content = card_content_les.length;
        var randline = Math.floor(Math.random() * (len_card_content));
        var progress = Math.round((100 / len_card_content) * len.length);
        while (len.includes(randline)) {
            var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
        }
        var card = card_content_les[randline];
        var card_listed = card.split(':');
        var card_h = card.slice(card.indexOf(':') + 1, card.length);
        var card_s = card.slice(0, card.indexOf(':')); //card_content.split('$$');
        var card_content = card_content.sort(function () { return 0.5 - Math.random() });
        }
        {//generating buttons from cards array
        var meaning = ``;
        var cas = [];
        for (x in card_content_les) {
            var xx = card_content_les[x];
            var mean = xx.slice(0, xx.indexOf(':'));
            cas.push('#btn_' + x);
            meaning += `
                <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
        }
        }
        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center">
                        <h1>${card_h}</h1>
                        <span class="ml_20 text_20">(${headings[vars[2]]})</span>
                    </div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id='check' onmousedown='clkk()'>OK</div>
                    </div>
                    <div class="flex_center">${meaning}</div>
                </div>
            </div>
        `;

        var buttons_array = [];
        var id_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in buttons_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                for (x in buttons_array) {
                    if (x==buttons_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${buttons_array[x]}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });


        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });

                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//shows a question with single button as answer
    function button_prompt_whole_content_multi() {//if there are multiple cards in a single array like before
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];
            var card_content = cardm.slice(1, cardm.length);
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var len_card_content = card_content_les.length;
            var randline = Math.floor(Math.random() * (len_card_content));
            var progress = Math.round((100 / len_card_content) * len.length);
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
            }
            var card = card_content_les[randline];
            var card_listed = card.split(':');
            var card_h = card.slice(card.indexOf(':') + 1, card.length);
            var card_s = card.slice(0, card.indexOf(':')); //card_content.split('$$');
            var card_content = card_content.sort(function () { return 0.5 - Math.random() });
        }

        {//generating buttons from cards array
        var meaning = ``;
        var cas = [];
        for (x in card_content) {
            var xx = card_content[x];
            var mean = xx.slice(0, xx.indexOf(':'));
            cas.push('#btn_' + x);
            meaning += `
                <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
        }
        }

        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center">
                        <h1>${card_h}</h1>
                        <span class="ml_20 text_20">(${headings[vars[2]]})</span>
                    </div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id='check' onmousedown='clkk()'>OK</div>
                    </div>
                    <div class="flex_center_wrap">${meaning}</div>
                </div>
            </div>
        `;

        var buttons_array = [];
        var id_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in buttons_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                for (x in buttons_array) {
                    if (x==buttons_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${buttons_array[x]}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });

        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });

                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//gives all entries of the card unlike "button_promt" which gives only specified entries/criteria
    function wbutton_prompt_whole_content() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];
            var card_content = cardm.slice(1, cardm.length);
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var len_card_content = card_content_les.length;
            var randline = Math.floor(Math.random() * (len_card_content));
            var progress = Math.round((100 / len_card_content) * len.length);
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var card_h = card_listed[1];
            var card_s = card_listed[0];
            var card_s_conf = card_content_les[randline][2].split(':');
            var card_content = card_content.sort(function () { return 0.5 - Math.random() });
        }

        {//generating buttons from cards array
        var meaning = `<button style="" onmousedown="clkk()" id="btn_5" value="${card_s}" class="nfocus">${card_s}</button>`;
        var cas = [];
        for (x in card_s_conf) {
            var xx = card_s_conf[x];
            var mean = xx;
            cas.push('#btn_' + x);
            meaning += `
                <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
        }
        }

        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center">
                        <h1>${card_h}</h1>
                        <span class="ml_20 text_20">(${headings[vars[2]]})</span>
                    </div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id='check' onmousedown='clkk()'>OK</div>
                    </div>
                    <div class="flex_center_wrap">${meaning}</div>
                </div>
            </div>
        `;

        var buttons_array = [];
        var id_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in buttons_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                for (x in buttons_array) {
                    if (x==buttons_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${buttons_array[x]}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });

        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });

                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//gives all entries of the card unlike "button_promt" which gives only specified entries/criteria
    function wbutton_prompt_whole_content_multi() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = cardm[0];
            var card_content = cardm.slice(1, cardm.length);
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var len_card_content = card_content_les.length;
            var randline = Math.floor(Math.random() * (len_card_content));
            var progress = Math.round((100 / len_card_content) * len.length);
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var card_h = card.slice(card.indexOf(':') + 1, card.length);
            var card_s = card.slice(0, card.indexOf(':')); //card_content.split('$$');
            var card_content = card_content.sort(function () { return 0.5 - Math.random() });
        }

        {//generating buttons from cards array
        var meaning = ``;
        var cas = [];
        for (x in card_content) {
            var xx = card_content[x][0];
            var mean = xx.slice(0, xx.indexOf(':'));
            cas.push('#btn_' + x);
            meaning += `
                <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
        }
        }

        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center">
                        <h1>${card_h}</h1>
                        <span class="ml_20 text_20">(${headings[vars[2]]})</span>
                    </div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id='check' onmousedown='clkk()'>OK</div>
                    </div>
                    <div class="flex_center_wrap">${meaning}</div>
                </div>
            </div>
        `;

        var buttons_array = [];
        var id_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in buttons_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                for (x in buttons_array) {
                    if (x==buttons_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${buttons_array[x]}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });

        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });

                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//gives all entries of the card unlike "button_promt" which gives only specified entries/criteria

    function wbutton_prompt() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = `nouns`;
            var card_content = cardm;
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var len_card_content = card_content_les.length;
            var randline = Math.floor(Math.random() * (len_card_content));
            var progress = Math.round((100 / len_card_content) * len.length);
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var card_h = card_listed[1];
            var card_s = card_listed[0];
            var card_content = card_content.sort(function () { return 0.5 - Math.random() });
            var word_conf = card_content_les[randline][2];
            word_conf.push(card)
            var word_conf = word_conf.sort(function () { return 0.5 - Math.random() });
        }

        {//generating buttons from cards array
            var meaning = ``;
            var cas = [];
            for (x in word_conf) {
                var xx = word_conf[x].split(':');
                var mean = xx[0];
                cas.push('#btn_' + x);
                meaning += `
                    <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
                `;
            }
        }
        
        body.innerHTML = `
            <div class="inf">
                <div>lesson - ${unit}</div>
                <div class="main">${card_title}</div>
                <div>page - ${num + 1}</div>
            </div>
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center">
                        <h1>${card_h}</h1>
                        <span class="ml_20 text_20">(${headings[vars[2]]})</span>
                    </div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id='check' onmousedown='clkk()'>OK</div>
                    </div>
                    <div class="flex_center">${meaning}</div>
                </div>
            </div>
        `;

        var buttons_array = [];
        var id_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in buttons_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                //resetting buttons
                buttons_array = [];
                id_array = [];
                $('button').css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })

                //updating buttons
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                buttons += `<button onclick="btn_remove('${thiss_id}')" class="nfocus fade">${thiss_text}</button>`;
                
                {//loop below lets the .line container add more than one button remove above buttons updating line to use the loop
                    // for (x in buttons_array) {
                    //     if (x==buttons_array.length-1){//last button
                    //         buttons += `<button onclick="btn_remove('${id_array[thiss_id]}')" class="nfocus fade">${buttons_array[thiss_text]}</button>`;
                    //     }else{
                    //         buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    //     }
                    // }
                }
                
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });


        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });

                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//shows a question with single button as answer
    function wbutton_prompt_reverse() {
        {//variables
            var vars = arguments;
            var cardm = vars[0];
            card_title = `nouns`;
            var card_content = cardm;
            if (vars[1][1]==0){
                var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }else{
                var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
            }
            var len_card_content = card_content_les.length;
            var randline = Math.floor(Math.random() * (len_card_content));
            var progress = Math.round((100 / len_card_content) * len.length);
            while (len.includes(randline)) {
                var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
            }
            var card = card_content_les[randline][0];
            var card_listed = card.split(':');
            var card_h = card_listed[0];
            var card_s = card_listed[1];
            var card_content = card_content.sort(function () { return 0.5 - Math.random() });
            var word_conf = card_content_les[randline][2];
            word_conf.push(card);//it has error when the wbutton_prompt screen shows up again, it adds the card repeatedly
            var word_conf = word_conf.sort(function () { return 0.5 - Math.random() });
        }

        {//generating buttons from cards array
            var meaning = ``;
            var cas = [];
            for (x in word_conf) {
                var xx = word_conf[x].split(':');
                var mean = xx[1];
                cas.push('#btn_' + x);
                meaning += `
                    <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="btn-outline-light">${mean}</button>
                `;
            }
        }
        
        body.innerHTML = `
            <div class="inf">
                <div class="col-3 fs-5">lesson - ${unit}</div>
                <div class="col-6 text-center fs-4">${card_title}</div>
                <div class="col-3 text-end fs-5">page - ${num + 1}</div>
            </div>

            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                    <div class="trans">
                        <div class="d-flex justify-content-center gap-3">
                            <div class="img_card">
                                <img src="/static/img/svg/${card_h}.svg" alt="..."/>
                            </div>
                            <div>
                                <div class="word-main">${card_h}</div>
                                <span class="fs-4">(${headings[1]})</span>
                            </div>
                        </div>
                        

                        <div class="tr_content">
                            <div class="line">${meaning}</div>
                            <div class="text-end" id='check' onmousedown='clkk()'>OK</div>
                        </div>
                        <div class="flex_center"></div>
                    </div>
                </div>
            </div>
        `;

        var buttons_array = [];
        var id_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (buttons_array.includes(thiss_text)) {
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                id_array.splice(id_array.indexOf(thiss_id), 1);
                // for (x in buttons_array) {
                //     buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                // }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                // $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                //resetting buttons
                buttons_array = [];
                id_array = [];
                $('button').css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })

                //updating buttons
                buttons_array.push(thiss_text);
                id_array.push(thiss_id);
                // buttons += `<button onclick="btn_remove('${thiss_id}')" class="nfocus fade">${thiss_text}</button>`;
                
                {//loop below lets the .line container add more than one button remove above buttons updating line to use the loop
                    // for (x in buttons_array) {
                    //     if (x==buttons_array.length-1){//last button
                    //         buttons += `<button onclick="btn_remove('${id_array[thiss_id]}')" class="nfocus fade">${buttons_array[thiss_text]}</button>`;
                    //     }else{
                    //         buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                    //     }
                    // }
                }

                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                // $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });


        $('#check').on('click', function () {
            if (buttons_array.join() == card_s) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });

                if (right == 4) {
                    prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                    right = 0;
                } else {
                    prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }//shows a question with single button as answer
}

function listen_prompt() {//listen and choose answer
    {//variables
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];//card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(1, cardm.length)//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var card_count = card_content_les.length; //var card_count = vars[1][1] == 0 ? card_content_les.length : vars[1][1]; //from arguments
    var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    }
    var card = card_content_les[randline];
    var card_listed = card.split(':');
    var word = card.slice(0, card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':') + 1, card.length);
    }
    textToSpeech(meaning);
    {//generating 4 cards
    var cards_arr = [word];
    for (x of card_content) {
        var y = x.slice(0, x.indexOf(':'));
        if (cards_arr.includes(y) == false) {
            cards_arr.push(y);
        }
        if (cards_arr.length == 4) {
            break;
        }
    }
    cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array
    }

    var criteria = [];
    for (x in cards_arr) {
        if (card_listed.includes(cards_arr[x])) {
            criteria.push(1);
        } else {
            criteria.push(0);
        }
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div id="img"><img src="/static/img/svg/zari.svg"/></div>
        <div class="content">
            <div class="flex_center">${len.length}/${card_count}</div>
            <div id="cardm" class="card_4">
                <div class="nav_1">
                    <div class="flex_center">
                        <div class="word">${meaning}
                            <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${word}</div>
                        </div>
                        <span class="caption">${headings[vars[2]]}</span>
                    </div>
                </div>
                    <div class="nav_2">
                    <div onmousedown="clkk()" class="card" accesskey="1"><div class="short">1</div>${cards_arr[0]}</div>
                    <div onmousedown="clkk()" class="card" accesskey="2"><div class="short">2</div>${cards_arr[1]}</div>
                    <div onmousedown="clkk()" class="card" accesskey="3"><div class="short">3</div>${cards_arr[2]}</div>
                    <div onmousedown="clkk()" class="card" accesskey="4"><div class="short">4</div>${cards_arr[3]}</div>
                </div>
            </div>
        </div>
    `;


    $('.card').on('click', function () {
        var thiss = $(this);

        if (card_listed.includes(thiss.text().slice(1, 20))) {
            len.push(randline);
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
            prm.innerHTML = prompt_msg;
        } else {
            if (error_array.includes(vars[3])==false) {
                error_array.push(vars[3]);//adding the function/lesson into the error array so as to revise it later
            }
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            var prompt_msg = sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0];
            prm.innerHTML = prompt_msg;
        }
        if (len.length == card_count) {
            len = [];
            navigate('next');
        } else {
            window[`master_${vars[3]}`]();
        }
    });
}

function hv_prompt() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];
    var card_content = cardm.slice(1, cardm.length);
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var card_count = card_content_les.length;
    var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    }
    var card = card_content_les[randline];
    var card_listed = card.split(':')
    var word = card.slice(0, card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':') + 1, card.length);
    var cards_arr = [];
    for (x of card_content) {
        var y = x.slice(x.indexOf(':') + 1, x.length);
        if (cards_arr.includes(y) == false) {
            cards_arr.push(y);
        }
        if (cards_arr.length == 4) {
            break;
        }
    }
    cards_arr.sort(function () { return 0.5 - Math.random() }); // Orders randomly an array

    var criteria = [];
    for (x in cards_arr) {
        if (card_listed.includes(cards_arr[x])) {
            criteria.push(1);
        } else {
            criteria.push(0);
        }
    }
    body.innerHTML = `
        <div class="inf">
            <div class="col-3 fs-4">lesson - ${unit}</div>
            <div class="col-6 text-center fs-3">${card_title}</div>
            <div class="col-3 text-end fs-4">page - ${num + 1}</div>
        </div>
        <div class="container-fluid p-5">
            <div class="d-flex justify-content-center col-12 m-2">${len.length}/${card_count}</div>
            
            <div id="cardm" class="row col-12">
                <div class="row col-sm-12 col-md-6 mb-5">
                    <div class="d-flex justify-content-center">
                        <div style="cursor:pointer;"><img class="duo-speaker" src="/static/img/svg/loudspeaker_duo.svg" style="scale:0.8"/></div>
                        <div>
                            <div class="word mb-sm-5">${word}
                                <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${meaning}</div>
                            </div>
                        </div>
                        <span class="caption">की <span class="tooltip_c">Helping Verb<span class="tooltip_t">is, am, are</span></span> चुनें</span>
                    </div>
                    <img src="/static/img/svg/man_norm_eyes_up.svg" class="emot_img"/>
                </div>

                <div class="d-sm-block d-md-none mb-5"></div>

                <div class="col-sm-12 col-md-6">
                    <div class="d-flex justify-content-center">
                        <div onmousedown="clkk()" class="card col-sm-6" accesskey="1" value="${cards_arr[0]}">
                            <div class="short">1</div>
                            ${cards_arr[0]}
                        </div>
                        <div onmousedown="clkk()" class="card col-sm-6" accesskey="2" value="${cards_arr[1]}">
                            <div class="short">2</div>
                            ${cards_arr[1]}
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div onmousedown="clkk()" class="card col-sm-6" accesskey="3" value="${cards_arr[2]}">
                            <div class="short">3</div>
                            ${cards_arr[2]}
                        </div>
                        <div onmousedown="clkk()" class="card col-sm-6" accesskey="4" value="${cards_arr[3]}">
                            <div class="short">4</div>
                            ${cards_arr[3]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;


    $('.card').on('click', function () {
        var thiss = $(this);
        var thiss_text = this.getAttribute('value');

        if (meaning == thiss_text) {
            textToSpeech(meaning);
            len.push(randline);
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            var prompt_msg = wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
            prm.innerHTML = prompt_msg;

            if (len.length == card_count) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        } else {
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}


function match_prompt() {//matching cards
    {//variables
        var vars = arguments;
        var cardm = vars[0];
        card_title = `match`;
        var card_content = cards_db;
        if (vars[1][1]==0) {
            var card_content_les = card_content.slice(vars[1][0],card_content.length);
        } else {
            var card_content_les = card_content.slice(vars[1][0], vars[1][1]);
        }
        var len_card_content = card_content_les.length;
    }

    var word = [];
    var meaning = [];
    for (x in card_content_les) {
        var mean = card_content_les[x].split(":");
        word.push(`<button onmousedown="clkk()" id="btnw_${x}" value="${mean[0]}" class="match_btn">${mean[0]}</button>`);
        meaning.push(`<button onmousedown="clkk()" id="btnm_${x}" value="${mean[1]}" class="match_btn">${mean[1]}</button>`);
    }
    word.sort(function () { return 0.5 - Math.random() })
    meaning.sort(function () { return 0.5 - Math.random() })

    var word = word.join("");
    var meaning = meaning.join("");
    
    body.innerHTML = `
        <div class="inf">
            <div class="col-3 fs-4">lesson - ${unit}</div>
            <div class="col-6 text-center fs-3">${card_title}</div>
            <div class="col-3 text-end fs-4">page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div>
                    <div class="flex_spar mtb_20">${word}</div>
                    <div class="flex_spar mtb_20">${meaning}</div>
                </div>
            </div>
        </div>
    `;


    var buttons_array = [];
    var id_array = [];

    $('button').on('click', function () {
        //var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();
        var thiss_id = thiss.attr('id');

        if (buttons_array.includes(thiss_text)) {
            buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
            id_array.splice(id_array.indexOf(thiss_id), 1);

            thiss.css({
                'background-color': '#cccccc',
                'color': '#222222'
            });
        } else {
            buttons_array.push(thiss_text);
            id_array.push(thiss_id);
            thiss.css({
                'background-color': 'rgb(60, 179, 114, 0.95)',
                'color': '#f1f1f1'
            });
            textToSpeech(thiss_text);
        }

        if (buttons_array.length==2) {
            var xx = card_content_les.includes(buttons_array[0]+':'+buttons_array[1]);
            var yy = card_content_les.includes(buttons_array[1]+':'+buttons_array[0]);
            if (xx || yy) {
                for (x of id_array) {
                    document.querySelector('#'+x).classList.remove("nfocus_warn");
                    document.querySelector('#'+x).style.backgroundColor = "#999";
                    document.querySelector('#'+x).style.color = "#ccc";
                    document.querySelector('#'+x).disabled = true;
                }
                len.push("a");
                buttons_array = [];
                id_array = [];
            } else {
                // prompt.style.display = "block";
                // $('#prm').css({
                //     "background-color": "rgb(85, 85, 85, 0.95)",
                //     "animation": "prm 1s ease 0ms 1 normal forwards"
                // });
                // prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
                for (x of id_array) {
                    document.querySelector('#'+x).style.backgroundColor= "darkred";
                }
                buttons_array = [];
                id_array = [];
            }
            buttons_array = [];
            // $('button').css({
            //     'background-color': '#cccccc',
            //     'color': '#222222'
            // })
        }
        if (len.length == len_card_content) {
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = wish[Math.floor(Math.random() * (wishh.length - 0)) + 0];
        }
        //NAVIGATES TO ANOTHER PAGE OR UNIT
        if (len.length == len_card_content) {
            if (vars[4] == 1) {
                location.assign(`/english/learn/${lesson + 1}`);
            } else {
                navigate('next');
            }
        }// else {
        //    navigate('reload');
        //}
        //END NAVIGATES
    });
}


function write_beg() {
    {//variables
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];
    var card_content = cardm.slice(1, cardm.length);
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var len_card_content = card_content_les.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content_les[randline];
    // var card_title = card.slice(0,card.indexOf('$$'))
    var word = card.slice(0, card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':') + 1, card.length)
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center">
                    <div class="tooltip_container">
                        <h1>${meaning}</h1>
                        <div class="tooltip_text">${word}</div>
                    </div>
                </div>
                <div class="tr_content">
                    <input placeholder="Type Here..." id="text" type="text"></input>
                    <div id="check" onmousedown="clkk()">OK</div>
                </div>
                <div class="flex_center"></div>
            </div>
            </div>
        </div>
    `;
    $('#text').focus();

    // input.addEventListener("input", function (e) {
    //     clkk();
    // });// calls "clkk()" function when user types, alternative // use "oninput" as HTML DOM

    $('#text').on('input', function () {
        var thiss = $(this);
        var thiss_text = thiss.val();

        if (thiss_text.length >= 0) {
            $('#check').css({
                'display': 'inline'
            });
        } else if (thiss_text.length < -1) {
            $('#check').css({
                'display': 'none'
            });
        };
        clkk();
    });

    $('#check').on('click', function () {
        var word_lower = word.toLowerCase();
        var text = $('#text').val().toLowerCase().trim();
        if (word_lower==text) {
            len.push(randline);
            right += 1;
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            if (right == 4) {
                prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                right = 0;
            } else {
                prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            }
            if (len.length == len_card_content) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        } else {
            wrong += 1;
            if (wrong == 3) {
                errors.push(`Entered incorrectly the card [${card_title} (${card})] 3 times at Lesson ${num + 1} of Unit ${unit}`);
                console.log(errors);
                $('#text').val(word)
                wrong = 0;
            }
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}//answer by writing
function write_med() {
    {//variables
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];
    var card_content = cardm.slice(1, cardm.length);
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var len_card_content = card_content_les.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content_les[randline];
    // var card_title = card.slice(0,card.indexOf('$$'))
    var word = card.slice(0, card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':') + 1, card.length)
    }
    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center">
                    <h1>${meaning}</h1>
                </div>
                <div class="tr_content">
                    <input placeholder="Type Here..." id="text" type="text"></input>
                    <div id="check" onmousedown="clkk()">OK</div>
                </div>
                <div class="flex_center"></div>
            </div>
            </div>
        </div>
    `;
    $('#text').focus();

    // input.addEventListener("input", function (e) {
    //     clkk();
    // });// calls "clkk()" function when user types, alternative // use "oninput" as HTML DOM

    $('#text').on('input', function () {
        var thiss = $(this);
        var thiss_text = thiss.val();

        if (thiss_text.length >= 0) {
            $('#check').css({
                'display': 'inline'
            });
        } else if (thiss_text.length < -1) {
            $('#check').css({
                'display': 'none'
            });
        };
        clkk();
    });

    $('#check').on('click', function () {
        var word_lower = word.toLowerCase();
        var text = $('#text').val().toLowerCase().trim();
        if (word_lower==text) {
            len.push(randline);
            right += 1;
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            if (right == 4) {
                prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                right = 0;
            } else {
                prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            }
            if (len.length == len_card_content) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                window[`master_${vars[3]}`]();
            }
        } else {
            wrong += 1;
            if (wrong == 3) {
                errors.push(`Entered incorrectly the card [${card_title} (${card})] 3 times at Lesson ${num + 1} of Unit ${unit}`);
                console.log(errors);
                $('#text').val(word)
                wrong = 0;
            }
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}//"write_beg" with no hints/suggestions
function write_int() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];
    var card_content = cardm.slice(1, cardm.length);
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var len_card_content = card_content_les.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content[randline];
    // var card_title = card.slice(0,card.indexOf('$$'))
    var word = card.slice(0, card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':') + 1, card.length)

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center">
                    <h1>${meaning}</h1>
                </div>
                <div class="line">
                    <input placeholder="Type Here..." id="text" type="text"></input>
                </div>
                <div class="flex_center"></div>
            </div>
            <div id="check" onmousedown="clkk()">Check</div>
        </div>
        `;
    $('#text').focus();


    var input = document.getElementById("text");
    input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            $('#check').click();
        }
    });
    input.addEventListener("input", function (e) {
        clkk();
    });// calls "clkk()" function when user types, alternative // use "oninput" as HTML DOM

    $('#text').on('keydown', function () {
        var thiss = $(this);
        var thiss_text = thiss.val();

        if (thiss_text.length < 2) {
            $('#check').css({
                'display': 'none'
            });
        }
        if (thiss_text.length >= 0) {
            $('#check').css({
                'display': 'inline-block'
            });
        }

        document.querySelector('#inf').innerHTML = `
                <div class="inf">
                    <div></div>
                    <div>Unit ${unit} - (Page: ${num + 1})</div>
                    <div id="tt"></div>
                </div>
            `;
    });

    $('#check').on('click', function () {
        var card_lower = card;
        var text = $('#text').val();
        if (card_lower.includes(text)) {
            len.push(randline);
            right += 1;
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            if (right == 4) {
                prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                right = 0;
            } else {
                prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            }
            if (len.length == len_card_content) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                window[`master_${vars[3]}`]();
            }
        } else {
            wrong += 1;
            if (wrong == 3) {
                $('#text').val(word)
                wrong = 0;
            }
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}//"write_beg" intermediate : with confusing answers

{//TRANSLATE
function translate_beg() {
    {//variables
        var vars = arguments;
        var cardm = vars[0];
        card_title = "TRANSLATION";
        var card_content = cardm;
        if (vars[1][1]==0){
            var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }else{
            var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }
        var len_card_content = card_content_les.length;
        var randline = Math.floor(Math.random() * (len_card_content));
        var progress = Math.round((100 / len_card_content) * len.length);
        while (len.includes(randline)) {
            var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
        }
        var card = card_content_les[randline][0];
        //added later need to update in others as well
        var english_array = card[0];
        var hindi_array = card[1];
        //--------------------------------------------
        var card_h = card[1][0];
        var card_h_spl = card_h.split(' ');
        textToSpeech(card_h);
        //var card_order = card[0][0].split(' ');//used initially for checking criteria
        var card_s = card[0][0].split(' ');
    }

    {//generating confusing words DISABLED FOR THIS
        // var crdlw = card_content_les[randline][1].split(':');
        // for (x of crdlw) {
        //     card_s.push(x);
        // }
        // var crdl = card_s.map(word => word.toLowerCase());//converting the entire array(card_s) to lowercase
        // if (crdl.includes('a')) {
        //     card_s.push('an');
        // } else if (crdl.includes('an')) {
        //     card_s.push('a');
        // }
    
        // if (crdl.includes('are') || crdl.includes('am')) {
        //     card_s.push('is')
        // } else {
        //     card_s.push('are');
        // }
    }
    {//getting words meaning from db
        var dbwordsObj = english.db.words;//object to iterate in
        var dbwords_dump = [];//all lists from above Object
        for (x in dbwordsObj) {
            var y = dbwordsObj[x];
            dbwords_dump.push(y);
        };
        var dbwords = dbwords_dump.reduce((r, e) => (r.push(...e), r), [])//while 'list' has multiple lists, this code converting them into single item by joining them
        var card_heads_mean = [];
        for (x in card_h_spl) {
            for (y in dbwords) {
                var dbx = dbwords[y].split(':');
                if (dbx.includes(card_h_spl[x])) {
                    card_heads_mean.push(dbx[0]);
                }
            }
            if (card_heads_mean.length==x) {
                card_heads_mean.push(card_h_spl[x]);
            }
        }
    }
    {//generating hi-meaning heads
        var card_h_array = ``;
        for (x in card_h_spl) {
            var mean = card_h_spl[x];
            card_h_array += `<div class="tooltip_container"><h1>${mean}</h1><div class="tooltip_text">${card_heads_mean[x]}</div></div>`;
        }
    }

    card_s.sort(function () { return 0.5 - Math.random() });

    {//generating en-word buttons
        var meaning = ``;
        var cas = [];
        for (x in card_s) {
            var mean = card_s[x];
            cas.push('#btn_' + x);
            meaning += `
                <button onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
        }
    }

    body.innerHTML = `
        <div class="inf">
            <div class="col-3 fs-4">lesson - ${unit}</div>
            <div class="col-6 text-center fs-3">${card_title} <svg onclick="toggleModal(${vars[2]})" style="filter:drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));fill:#f1f1f1;color:green;float:right;" xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 96 960 960" width="34"><path d="M160 856v-60h386v60H160Zm0-166v-60h640v60H160Zm0-167v-60h640v60H160Zm0-167v-60h640v60H160Z"/></svg></div>
            <div class="col-3 text-end fs-4">page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center"><div id="speaker" style="scale:0.6;cursor:pointer;"><img src="/static/img/svg/loudspeaker_duo.svg"/></div>${card_h_array}</div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id="check" onmousedown="clkk()">OK</div>
                    </div>
                    <div class="flex_center">${meaning}</div>
                </div>
            </div>
        </div>
    `;


    $('#speaker').on('click', function () {
        textToSpeech(card_h);
    });

    {//buttons
        var id_array = [];
        var buttons_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (id_array.includes(thiss_id)) {
                id_array.splice(id_array.indexOf(thiss_id), 1);
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                for (x in id_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                id_array.push(thiss_id);
                buttons_array.push(thiss_text);
                for (x in id_array) {
                    if (x==id_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });

        $('#check').on('click', function () {
            for (cardx of english_array) {
                var cardx = cardx.split(' ');
                if (buttons_array.join(';') == cardx.join(';')) {
                    len.push(randline);
                    right += 1;
                    prompt.style.display = "block";
                    $('#prm').css({
                        "background-color": "rgb(60, 179, 114, 0.95)",
                        "animation": "prm 1.5s ease 0ms 1 normal forwards"
                    });


                    if (right == 4) {
                        prm.innerHTML = wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                        right = 0;
                    } else {
                        prm.innerHTML = wish[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                        //textToSpeech(wish);
                    };

                    if (len.length == len_card_content) {
                        len = [];
                        if (vars[4] == 1) {
                            location.assign(`/learn/${lesson + 1}`);
                        } else {
                            navigate('next');
                        }
                    } else {
                        navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                    }
                    break;
                } else {
                    prompt.style.display = "block";
                    $('#prm').css({
                        "background-color": "rgb(85, 85, 85, 0.95)",
                        "animation": "prm 1s ease 0ms 1 normal forwards"
                    });
                    prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
                }
            }
        });
    }
}//translate by selecting buttons in a correct order with hints/suggestions
function translate_beg_conf() {
    {//variables
        var vars = arguments;
        var cardm = vars[0];
        card_title = "TRANSLATION";
        var card_content = cardm;
        if (vars[1][1]==0){
            var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }else{
            var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }
        var len_card_content = card_content_les.length;
        var randline = Math.floor(Math.random() * (len_card_content));
        var progress = Math.round((100 / len_card_content) * len.length);
        while (len.includes(randline)) {
            var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
        }
        var card = card_content_les[randline][0];
        //added later need to update in others as well
        var english_array = card[0];
        var hindi_array = card[1];
        //--------------------------------------------
        var card_h = card[1][0];
        var card_h_spl = card_h.split(' ');
        textToSpeech(card_h);
        //var card_order = card[0][0].split(' ');//used initially for checking criteria
        var card_s = card[0][0].split(' ');
    }

    {//generating confusing words
        var crdlw = card_content_les[randline][1].split(':');
        for (x of crdlw) {
            card_s.push(x);
        }
        var crdl = card_s.map(word => word.toLowerCase());//converting the entire array(card_s) to lowercase
        
        // if (crdl.includes('a')) {
        //     card_s.push('an');
        // } else if (crdl.includes('an')) {
        //     card_s.push('a');
        // }
    
        // if (crdl.includes('are') || crdl.includes('am')) {
        //     card_s.push('is')
        // } else {
        //     card_s.push('are');
        // }
    }
    {//getting words meaning from db
        var dbwordsObj = english.db.words;//object to iterate in
        var dbwords_dump = [];//all lists from above Object
        for (x in dbwordsObj) {
            var y = dbwordsObj[x];
            dbwords_dump.push(y);
        };
        var dbwords = dbwords_dump.reduce((r, e) => (r.push(...e), r), [])//while 'list' has multiple lists, this code converting them into single item by joining them
        var card_heads_mean = [];
        for (x in card_h_spl) {
            for (y in dbwords) {
                var dbx = dbwords[y].split(':');
                if (dbx.includes(card_h_spl[x])) {
                    card_heads_mean.push(dbx[0]);
                }
            }
            if (card_heads_mean.length==x) {
                card_heads_mean.push(card_h_spl[x]);
            }
        }
    }
    {//generating hi-meaning heads
        var card_h_array = ``;
        for (x in card_h_spl) {
            var mean = card_h_spl[x];
            card_h_array += `<div class="tooltip_container"><h1>${mean}</h1><div class="tooltip_text">${card_heads_mean[x]}</div></div>`;
        }
    }

    card_s.sort(function () { return 0.5 - Math.random() });

    {//generating en-word buttons
        var meaning = ``;
        var cas = [];
        for (x in card_s) {
            var mean = card_s[x];
            cas.push('#btn_' + x);
            meaning += `
                <button onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
        }
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1} <svg onclick="toggleModal(${vars[2]})" style="filter:drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));fill:#f1f1f1;color:green;float:right;" xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 96 960 960" width="34"><path d="M160 856v-60h386v60H160Zm0-166v-60h640v60H160Zm0-167v-60h640v60H160Zm0-167v-60h640v60H160Z"/></svg></div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="box_shadow progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center"><div id="speaker" style="scale:0.6;cursor:pointer;"><img src="/static/img/svg/loudspeaker_duo.svg"/></div>${card_h_array}</div>
                    <div class="tr_content">
                        <div class="line"></div>
                        <div id="check" onmousedown="clkk()">OK</div>
                    </div>
                    <div class="flex_center">${meaning}</div>
                </div>
            </div>
        </div>
    `;
    $('#speaker').on('click', function () {
        textToSpeech(card_h);
    });

    {//buttons
        var id_array = [];
        var buttons_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (id_array.includes(thiss_id)) {
                id_array.splice(id_array.indexOf(thiss_id), 1);
                buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
                for (x in id_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                id_array.push(thiss_id);
                buttons_array.push(thiss_text);
                for (x in id_array) {
                    if (x==id_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });

        $('#check').on('click', function () {
            for (cardx of english_array) {
                var cardx = cardx.split(' ');
                if (buttons_array.join(';') == cardx.join(';')) {
                    len.push(randline);
                    right += 1;
                    prompt.style.display = "block";
                    $('#prm').css({
                        "background-color": "rgb(60, 179, 114, 0.95)",
                        "animation": "prm 1.5s ease 0ms 1 normal forwards"
                    });


                    if (right == 4) {
                        prm.innerHTML = wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                        right = 0;
                    } else {
                        prm.innerHTML = wish[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                        //textToSpeech(wish);
                    };

                    if (len.length == len_card_content) {
                        len = [];
                        if (vars[4] == 1) {
                            location.assign(`/learn/${lesson + 1}`);
                        } else {
                            navigate('next');
                        }
                    } else {
                        navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                    }
                    break;
                } else {
                    prompt.style.display = "block";
                    $('#prm').css({
                        "background-color": "rgb(85, 85, 85, 0.95)",
                        "animation": "prm 1s ease 0ms 1 normal forwards"
                    });
                    prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
                }
            }
        });
    }
}//translate_beg() + conf
function translate_beg_wh() {
    {//variables
        var vars = arguments;
        var cardm = vars[0];
        card_title = "TRANSLATION";
        var card_content = cardm;
        if (vars[1][1]==0){
            var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }else{
            var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }
        var len_card_content = card_content_les.length;
        var randline = Math.floor(Math.random() * (len_card_content));
        var progress = Math.round((100 / len_card_content) * len.length);
        while (len.includes(randline)) {
            var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
        }
        var card = card_content_les[randline][0];//trim() removing all the new lines and tabs spaces
        // var card_title = card.slice(0,card.indexOf('$$'))
        var card_h = card.slice(card.indexOf(':') + 1, card.length);
        var card_h_spl = card.slice(card.indexOf(':') + 1, card.length).split(' ');
        textToSpeech(card_h);
        var card_order = card.slice(0, card.indexOf(':')).split(' ');
        var card_s = card.slice(0, card.indexOf(':')).split(' '); //card_content.split('$$');
    }

    {//generating confusing words
        var crdlw = card_content_les[randline][1].split(':');
        for (x of crdlw) {
            card_s.push(x);
        }
        var crdl = card_s.map(word => word.toLowerCase());//converting the entire array(card_s) to lowercase
        if (crdl.includes('a')) {
            card_s.push('an');
        } else if (crdl.includes('an')) {
            card_s.push('a');
        }
    
        if (crdl.includes('are') || crdl.includes('am')) {
            card_s.push('is')
        } else {
            card_s.push('are');
        }
    
    }
    {//getting words meaning from db
        var dbwordsObj = english.db.words;//object to iterate in
        var dbwords_dump = [];//all lists from above Object
        for (x in dbwordsObj) {
            var y = dbwordsObj[x];
            dbwords_dump.push(y);
        };
        var dbwords = dbwords_dump.reduce((r, e) => (r.push(...e), r), [])//while 'list' has multiple lists, this code converting them into single item by joining them
        var card_heads_mean = [];
        for (x in card_h_spl) {
            for (y in dbwords) {
                var dbx = dbwords[y].split(':');
                if (dbx.includes(card_h_spl[x])) {
                    card_heads_mean.push(dbx[0]);
                }
            }
            if (card_heads_mean.length==x) {
                card_heads_mean.push(card_h_spl[x]);
            }
        }
    }
    {//generating hi-meaning heads
        var card_h_array = ``;
        for (x in card_h_spl) {
            var mean = card_h_spl[x];
            card_h_array += `<div class="tooltip_container"><h1>${mean}</h1><div class="tooltip_text">${card_heads_mean[x]}</div></div>`;
        }
    }

    card_s.sort(function () { return 0.5 - Math.random() });

    {//generating en-word buttons
        var meaning = ``;
        var cas = [];
        for (x in card_s) {
            var mean = card_s[x];
            cas.push('#btn_' + x);
            meaning += `
                <button onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
        }
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center"><div id="speaker" style="scale:0.6;cursor:pointer;"><img src="/static/img/svg/loudspeaker_duo.svg"/></div>${card_h_array}</div>
                <div class="tr_content">
                    <div class="line"></div>
                    <div id="check" onmousedown="clkk()">OK</div>
                </div>
                <div class="flex_center">${meaning}</div>
            </div>
        </div>
    `;
    $('#speaker').on('click', function () {
        textToSpeech(card_h);
    });

    {//buttons
        var id_array = [];
        var buttons_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (id_array.includes(thiss_id)) {
                id_array.splice(id_array.indexOf(thiss_id), 1);
                buttons_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in id_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                id_array.push(thiss_id);
                buttons_array.push(thiss_text);
                for (x in id_array) {
                    if (x==id_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });

        $('#check').on('click', function () {
            if (buttons_array.join() == card_order.join()) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });


                if (right == 4) {
                    prm.innerHTML = wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                    right = 0;
                } else {
                    prm.innerHTML = wish[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                    //textToSpeech(wish);
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }
}//translate by selecting buttons in a correct order with hints/suggestions

function allObj() {
    var vars = arguments;
    var list = [];
    for (x in vars[0]) {
        var y = vars[0][x].slice(1);
        list.push(y);
    };
    var list_2 = list.reduce((r, e) => (r.push(...e), r), [])//while 'list' has multiple lists, this code converting them into single item by joining them
    return list_2;
}//gives all items from a given object
function translate_beg_reverse() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];
    var card_content = cardm.slice(1, cardm.length);
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var len_card_content = card_content_les.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content[randline].trim();//removing all the new lines and tabs spaces
    // var card_title = card.slice(0,card.indexOf('$$'))
    var card_h = card.slice(card.indexOf(':') + 1, card.length);
    textToSpeech(card_h);
    var card_order = card.slice(0, card.indexOf(':')).split(' ');
    var card_s = card.slice(0, card.indexOf(':')).split(' '); //card_content.split('$$');
    var card_s = card_s.sort(function () { return 0.5 - Math.random() });

    var meaning = ``;
    var cas = [];
    for (x in card_s) {
        var mean = card_s[x];
        cas.push('#btn_' + x);
        meaning += `
            <button onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center"><h1>${card_h}</h1></div>
                <div class="tr_content">
                    <div class="line"></div>
                    <div id="check" onmousedown="clkk()">OK</div>
                </div>
                <div class="flex_center">${meaning}</div>
            </div>
        </div>
    `;

    var buttons_array = [];
    var id_array = [];

    $('button').on('click', function () {
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();
        textToSpeech(thiss_text);
        var thiss_id = thiss.attr('id');

        if (buttons_array.includes(thiss_text)) {
            buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
            id_array.splice(id_array.indexOf(thiss_id), 1);
            for (x in buttons_array) {
                buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'visibility':'visible',
                'background-color': '#cccccc',
                'color': '#222222'
            })
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        } else {
            buttons_array.push(thiss_text);
            id_array.push(thiss_id);
            for (x in buttons_array) {
                if (x==buttons_array.length-1){//last button
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${buttons_array[x]}</button>`;
                }else{
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
            }
            thiss.css({
                //'background-color': 'rgb(60, 179, 114, 0.95)',
                'background-color': 'rgb(60, 179, 114, 0.95)',
                'color': '#f1f1f1'
            });
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }
        if (buttons_array.length > 0) {
            $('#check').css({
                'display': 'inline'
            });
        } else {
            $('#check').css({
                'display': 'none'
            });
        };
    });

    $('#check').on('click', function () {
        if (buttons_array.join() == card_order.join()) {
            len.push(randline);
            right += 1;
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });


            if (right == 4) {
                prm.innerHTML = wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                right = 0;
            } else {
                prm.innerHTML = wish[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                //textToSpeech(wish);
            };

            if (len.length == len_card_content) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                window[`master_${vars[3]}`]();
            }
        } else {
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}//reverse "translate_beg" : show the learning language as questions

function translate_med() {
    {//variables
        var vars = arguments;
        var cardm = vars[0];
        card_title = "TRANSLATE";
        var card_content = cardm;
        if (vars[1][1]==0){
            var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }else{
            var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
        }
        var len_card_content = card_content_les.length;
        var randline = Math.floor(Math.random() * (len_card_content));
        var progress = Math.round((100 / len_card_content) * len.length);
        while (len.includes(randline)) {
            var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
        }
        var card = card_content_les[randline][0].trim();//trim() removing all the new lines and tabs spaces
        // var card_title = card.slice(0,card.indexOf('$$'))
        var card_h = card.slice(card.indexOf(':') + 1, card.length);
        var card_h_spl = card.slice(card.indexOf(':') + 1, card.length).split(' ');
        textToSpeech(card_h);
        var card_order = card.slice(0, card.indexOf(':')).split(' ');
        var card_s = card.slice(0, card.indexOf(':')).split(' '); //card_content.split('$$');
        var card_s = card_s.sort(function () { return 0.5 - Math.random() });
    }

    {//generating hi-meaning heads
        var card_h_array = ``;
        for (x in card_h_spl) {
            var mean = card_h_spl[x];
            card_h_array += `<div class="tooltip_container"><h1>${mean}</h1><div class="tooltip_text">${mean}</div></div>`;
        }
    }

    {//generating en-word buttons
        var meaning = ``;
        var cas = [];
        for (x in card_s) {
            var mean = card_s[x];
            cas.push('#btn_' + x);
            meaning += `
                <button onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
                `;
        }
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center"><h1>${card_h}</h1></div>
                <div class="tr_content">
                    <div class="line"></div>
                    <div id="check" onmousedown="clkk()">OK</div>
                </div>
                <div class="flex_center">${meaning}</div>
            </div>
        </div>
    `;
    {//buttons
        var id_array = [];
        var buttons_array = [];

        $('button').on('click', function () {
            var buttons = ``;
            var thiss = $(this);
            var thiss_text = thiss.text();
            var thiss_id = thiss.attr('id');

            if (id_array.includes(thiss_id)) {
                id_array.splice(id_array.indexOf(thiss_id), 1);
                buttons_array.splice(id_array.indexOf(thiss_id), 1);
                for (x in id_array) {
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                }
                thiss.css({
                    'visibility':'visible',
                    'background-color': '#cccccc',
                    'color': '#222222'
                })
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
            } else {
                id_array.push(thiss_id);
                buttons_array.push(thiss_text);
                for (x in id_array) {
                    if (x==id_array.length-1){//last button
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus fade">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }else{
                        buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${document.querySelector('#'+id_array[x]).innerText}</button>`;
                    }
                }
                thiss.css({
                    //'background-color': 'rgb(60, 179, 114, 0.95)',
                    'background-color': 'rgb(60, 179, 114, 0.95)',
                    'color': '#f1f1f1'
                });
                $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
                textToSpeech(thiss_text);
            }
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline'
                });
            } else {
                $('#check').css({
                    'display': 'none'
                });
            };
        });

        $('#check').on('click', function () {
            if (buttons_array.join() == card_order.join()) {
                len.push(randline);
                right += 1;
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(60, 179, 114, 0.95)",
                    "animation": "prm 1.5s ease 0ms 1 normal forwards"
                });


                if (right == 4) {
                    prm.innerHTML = wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                    right = 0;
                } else {
                    prm.innerHTML = wish[Math.floor(Math.random() * (wishh.length - 0)) + 0];
                    //textToSpeech(wish);
                };

                if (len.length == len_card_content) {
                    len = [];
                    if (vars[4] == 1) {
                        location.assign(`/learn/${lesson + 1}`);
                    } else {
                        navigate('next');
                    }
                } else {
                    navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
                }
            } else {
                prompt.style.display = "block";
                $('#prm').css({
                    "background-color": "rgb(85, 85, 85, 0.95)",
                    "animation": "prm 1s ease 0ms 1 normal forwards"
                });
                prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
            }
        });
    }
}

function translate_int() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];
    var card_content = cardm.slice(1, cardm.length);
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var len_card_content = card_content_les.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content[randline].trim();//removing all the new lines and tabs spaces
    // var card_title = card.slice(0,card.indexOf('$$'))
    var card_h = card.slice(card.indexOf(':') + 1, card.length);
    var card_order = card.slice(0, card.indexOf(':')).split(' ');
    var card_s = card.slice(0, card.indexOf(':')).split(' '); //card_content.split('$$');

    {//conf pushing
        var crdl = card_s.map(word => word.toLowerCase());//converting the entire array(card_s) to lowercase
        if (crdl.includes('a')) {
            card_s.push('an');
        } else if (crdl.includes('an')) {
            card_s.push('a');
        }
    
        if (crdl.includes('are') || crdl.includes('am')) {
            card_s.push('is')
        } else {
            card_s.push('are');
        }
    
    
        if (crdl.includes('he')) {
            card_s.push('She');
        } else if (crdl.includes('she')) {
            card_s.push('He');
        }


        if (crdl.includes('this')) {
            card_s.push('these');
            card_s.push('that');
        } else if (crdl.includes('these')) {
            card_s.push('this');
            card_s.push('those');
        }
    
        if (crdl.includes('have')) {
            card_s.push('has');
        }
    }

    var card_s = card_s.sort(function () { return 0.5 - Math.random() });

    var meaning = ``;
    var cas = [];
    for (x in card_s) {
        var mean = card_s[x];
        cas.push('#btn_' + x);
        meaning += `
            <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center"><h1>${card_h}</h1></div>
                <div class="tr_content">
                    <div class="line"></div>
                    <div id="check" onmousedown="clkk()">OK</div>
                </div>
                <div class="flex_center">${meaning}</div>
            </div>
        </div>
    `;

    var buttons_array = [];
    var id_array = [];

    $('button').on('click', function () {
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();
        var thiss_id = thiss.attr('id');

        if (buttons_array.includes(thiss_text)) {
            buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
            id_array.splice(id_array.indexOf(thiss_id), 1);
            for (x in buttons_array) {
                buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'visibility':'visible',
                'background-color': '#cccccc',
                'color': '#222222'
            })
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        } else {
            buttons_array.push(thiss_text);
            id_array.push(thiss_id);
            for (x in buttons_array) {
                if (x==buttons_array.length-1){
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }else{
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
            }
            thiss.css({
                //'background-color': 'rgb(60, 179, 114, 0.95)',
                'background-color': 'rgb(100, 100, 100)',
                'color': 'rgb(110, 110, 110)',
                'transition':'all 0.5s'
            });
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }
        if (buttons_array.length > 0) {
            $('#check').css({
                'display': 'inline'
            });
        } else {
            $('#check').css({
                'display': 'none'
            });
        };
    });

    $('#check').on('click', function () {
        if (buttons_array.join() == card_order.join()) {
            len.push(randline);
            right += 1;
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });

            if (right == 4) {
                prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                right = 0;
            } else {
                prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            };

            if (len.length == len_card_content) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                navigate('reload');//window["masters"](num);//window[`master_${vars[3]}`]();
            }
        } else {
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}
function translate_int_reverse() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm[0];
    var card_content = cardm.slice(1, cardm.length);
    if (vars[1][1]==0){
        var card_content_les = card_content.slice(vars[1][0],card_content.length); //cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }else{
        var card_content_les = card_content.slice(vars[1][0], vars[1][1]);//cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    }
    var len_card_content = card_content_les.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content[randline].trim();//removing all the new lines and tabs spaces
    // var card_title = card.slice(0,card.indexOf('$$'))
    var card_h = card.slice(card.indexOf(':') + 1, card.length);
    var card_order = card.slice(0, card.indexOf(':')).split(' ');
    var card_s = card.slice(0, card.indexOf(':')).split(' '); //card_content.split('$$');

    {//conf pushing
        var crdl = card_s.map(word => word.toLowerCase());//converting the entire array(card_s) to lowercase
        if (crdl.includes('a')) {
            card_s.push('an');
        } else if (crdl.includes('an')) {
            card_s.push('a');
        }
    
        if (crdl.includes('are') || crdl.includes('am')) {
            card_s.push('is')
        } else {
            card_s.push('are');
        }
    
    
        if (crdl.includes('he')) {
            card_s.push('She');
        } else if (crdl.includes('she')) {
            card_s.push('He');
        }


        if (crdl.includes('this')) {
            card_s.push('these');
            card_s.push('that');
        } else if (crdl.includes('these')) {
            card_s.push('this');
            card_s.push('those');
        }
    
        if (crdl.includes('have')) {
            card_s.push('has');
        }
    }

    var card_s = card_s.sort(function () { return 0.5 - Math.random() });

    var meaning = ``;
    var cas = [];
    for (x in card_s) {
        var mean = card_s[x];
        cas.push('#btn_' + x);
        meaning += `
            <button style="" onmousedown="clkk()" id="btn_${x}" value="${mean}" class="nfocus">${mean}</button>
            `;
    }

    body.innerHTML = `
        <div class="inf">
            <div>lesson - ${unit}</div>
            <div class="main">${card_title}</div>
            <div>page - ${num + 1}</div>
        </div>
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="box_shadow progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center"><h1>${card_h}</h1></div>
                <div class="tr_content">
                    <div class="line"></div>
                    <div id="check" onmousedown="clkk()">OK</div>
                </div>
                <div class="flex_center">${meaning}</div>
            </div>
        </div>
    `;

    var buttons_array = [];
    var id_array = [];

    $('button').on('click', function () {
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();
        var thiss_id = thiss.attr('id');

        if (buttons_array.includes(thiss_text)) {
            buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
            id_array.splice(id_array.indexOf(thiss_id), 1);
            for (x in buttons_array) {
                buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'visibility':'visible',
                'background-color': '#cccccc',
                'color': '#222222'
            })
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        } else {
            buttons_array.push(thiss_text);
            id_array.push(thiss_id);
            for (x in buttons_array) {
                if (x==buttons_array.length-1){
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }else{
                    buttons += `<button onclick="btn_remove('${id_array[x]}')" class="nfocus">${buttons_array[x]}</button>`;
                }
            }
            thiss.css({
                //'background-color': 'rgb(60, 179, 114, 0.95)',
                'background-color': 'rgb(100, 100, 100)',
                'color': 'rgb(110, 110, 110)',
                'transition':'all 0.5s'
            });
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }
        if (buttons_array.length > 0) {
            $('#check').css({
                'display': 'inline'
            });
        } else {
            $('#check').css({
                'display': 'none'
            });
        };
    });

    $('#check').on('click', function () {
        if (buttons_array.join() == card_order.join()) {
            len.push(randline);
            right += 1;
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });

            if (right == 4) {
                prm.innerHTML = `${wishh[Math.floor(Math.random() * (wishh.length - 0)) + 0]}`;
                right = 0;
            } else {
                prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            };

            if (len.length == len_card_content) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${lesson + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                window[`master_${vars[3]}`]();
            }
        } else {
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
    });
}

function btn_remove(id){
    document.querySelector(`#${id}`).click();
}// used in translate for buttons select/deselect functioning
}

{//MODALL
    const modal = document.querySelector(".modall");
    const closeButton = document.querySelector(".close-button");
    
    function toggleModal(content) {
        var modall_content_div = document.querySelector("#modall-content");
        modal.classList.toggle("show-modal");
        modall_content_div.innerHTML = content;
    }
    
    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}

function test(url) {
    var x = imageExists(url);
    body.innerHTML = `
        <div class="inf">
            <div>lesson - </div>
            <div class="main"></div>
            <div>page -  <svg onclick="toggleModal()" style="filter:drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));fill:#f1f1f1;color:green;float:right;" xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 96 960 960" width="34"><path d="M160 856v-60h386v60H160Zm0-166v-60h640v60H160Zm0-167v-60h640v60H160Zm0-167v-60h640v60H160Z"/></svg></div>
        </div>
        <div class="content">
            <div id="cardm" class="cardm_learn">
                <div class="flex_center">${x}</div>
            </div>
        </div>
    `;
}

function imageExists(image_url){//can also be used for pages other than images

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

function tip() {
    var len_arg = arguments.length;
    var last_arg_str = arguments[len_arg - 1];

    switch (len_arg) {
        case 3:
            break;
        case 2:
            if (arguments[0] == 1) {
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(60, 179, 114, 0.95)";
                prm.style.animation = "prm 1.5s ease 0ms 1 normal forwards";
                prm.innerHTML = `Correct`;
                window["master_" + last_arg_str](); //function runner
            } else {
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(85, 85, 85, 0.95)";
                prm.style.animation = "prm 1.5s ease 0ms 1 normal forwards";
                prm.innerHTML = "Incorrect!";
            }
            break;
        case 1:
            if (arguments[0] == arguments[1]) {
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(60, 179, 114, 0.95)";
                prm.innerHTML = `Correct`;
                if (arguments[2] == 1) {
                    navigation_b.innerHTML = `
                            <div class="inff" id="inff">
                                <div class="button" onclick="navigate('prev')">Prev</div>
                                <div class="button" onclick="window.location.assign('2')" onmousedown="clkk()">Next</div>
                            </div>
                        `;
                } else {
                    navigation_b.innerHTML = `
                            <div class="inff" id="inff">
                                <div class="button" onclick="navigate('prev')">Prev</div>
                                <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
                            </div>
                        `;

                }
            } else {
                prompt.style.display = "block";
                prm.style.backgroundColor = "rgb(85, 85, 85, 0.95)";
                prm.innerHTML = "Incorrect!";
            }
            break;
    }

}

//PROMPT SCREEN
function clkk() {
    prompt.style.display = "none";
} // important as it makes the prompt display again if not executed prompt wouldn't work
function warn() {
    prompt.style.display = "block";
    prm.style.backgroundColor = "#555";
    prm.innerHTML = "Please complete the lesson first!";
} // stops user from navigating to next page