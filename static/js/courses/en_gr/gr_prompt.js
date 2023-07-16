prompt = document.getElementById('prompt');
prm = document.getElementById('prm');

wish = ["Good Job!", "Badhiya!", "Correct!", "Right!", "Nicely done!", "Great!", "Yeah!", "Cool!"];
wishh = ["LAGATAR 4<br>Kya Baaat Hai!", "LAGATAR 4<br>Aap Achcha Kar Rahe Hain"];
sorry = ["Yeh Nahi Tha!", "Nahi!", "Wrong!", "Incorrect!", "Sorry!"];
sorryy = ["Yeh Nahi Tha!", "Nahi!", "Wrong!", "Incorrect!", "Sorry!"];

//PROMPT CARD SCREEN
var len = [];
var wrong = 0;
var right = 0;

function card_prompt() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    var card_content = card_content.split('__');
    var card_count = vars[1] == 0 ? card_content.length : vars[1]; //from arguments
    var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    }
    var card = card_content[randline];
    var card_listed = card.split(':');
    var word = card.slice(0, card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':') + 1, card.length);
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

    var criteria = [];
    for (x in cards_arr) {
        if (card_listed.includes(cards_arr[x])) {
            criteria.push(1);
        } else {
            criteria.push(0);
        }
    }
    body.innerHTML = `        
            <div class="content">
                <div class="flex_center">${len.length}/${card_count}</div>
                <div id="cardm" class="card_4">
                    <div class="nav_1">
                        <div class="flex_center">
                            <div class="word">${meaning}
                                <div class="tooltiptext" onload="textToSpeech(this.innerText)" onclick="textToSpeech(this.innerText)">${word}</div>
                            </div>
                            <span class="caption">choose the German Translation</span>
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
            var prompt_msg = len.length == card_count ? `Lesson Completed` : wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
            prm.innerHTML = prompt_msg;
        } else {
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
        if (len.length == card_count) {
            len = [];
            navigate('next');
        } else {
            window[`master_${vars[2]}`]();
        }
    });
}
function button_prompt() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$') + 2, cardm.length).split('__');
    var len_card_content = card_content.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content[randline];
    var card_listed = card.split(':');
    var card_h = card.slice(card.indexOf(':') + 1, card.length);
    var card_s = card.slice(0, card.indexOf(':')); //card_content.split('$$');
    var card_content = card_content.sort(function () { return 0.5 - Math.random() });

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

    body.innerHTML = `        
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center"><h1>${card_h}</h1></div>
                    <div class="line"></div>
                    <div class="flex_center">${meaning}</div>
                </div>
                <div id="check">Check</div>
            </div>
        `;

    var buttons_array = [];

    $('button').on('click', function () {
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();

        if (buttons_array.includes(thiss_text)) {
            buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
            for (x in buttons_array) {
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color': '#cccccc',
                'color': '#222222'
            })
            if (buttons_array.length == 0) {
                $('#check').css({
                    'display': 'none'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        } else {
            buttons_array.push(thiss_text);
            for (x in buttons_array) {
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color': 'rgb(60, 179, 114, 0.95)',
                'color': '#f1f1f1'
            })
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline-block'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        }
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
                navigate('next');
            } else {
                window[`master_${vars[2]}`]();
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
function hv_prompt() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$') + 2, cardm.length)
    var card_content = card_content.split('__');
    var card_count = vars[1] == 0 ? card_content.length : vars[1]; //from arguments
    var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (card_count - 0)) + 0;
    }
    var card = card_content[randline];
    var card_listed = card.split(':')
    var word = card.slice(0, card.indexOf(':'));
    var meaning = card.slice(card.indexOf(':') + 1, card.length);
    var cards_arr = [word];
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
        <div class="content">
            <div class="flex_center">${len.length}/${card_count}</div>
            <div id="cardm" class="card_4">
                <div class="nav_1">
                    <div class="flex_center">
                        <div class="word">${word}
                            <div class="tooltiptext" onclick="textToSpeech(this.innerText)">${meaning}</div>
                        </div>
                        <span class="caption">की Helping Verb चुनें</span>
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
            var prompt_msg = len.length == card_count ? `Lesson Completed` : wish[Math.floor(Math.random() * (wish.length - 0)) + 0];
            prm.innerHTML = prompt_msg;
        } else {
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(85, 85, 85, 0.95)",
                "animation": "prm 1s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${sorry[Math.floor(Math.random() * (sorry.length - 0)) + 0]}`;
        }
        if (len.length == card_count) {
            len = [];
            navigate('next');
        } else {
            window[`master_${vars[2]}`]();
        }
    });
}


function write_beg() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$') + 2, cardm.length).split('__');
    var sli = vars[1] == 0 ? card_content.length : vars[1];
    var card_content = card_content.slice(0, sli);
    var len_card_content = card_content.length;
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
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center">
                    <div class="tooltip_container">
                        <h1>${meaning}</h1>
                        <div class="tooltip_text">${word}</div>
                    </div>
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
    });

    $('#check').on('click', function () {
        var card_lower = card.toLowerCase();
        var text = $('#text').val().toLowerCase();
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
                    location.assign(`/learn/${unit + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                window[`master_${vars[2]}`]();
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
}
function write_int() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$') + 2, cardm.length).split('__');
    var sli = vars[1] == 0 ? card_content.length : vars[1];
    var card_content = card_content.slice(0, sli);
    var len_card_content = card_content.length;
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
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="progress" id="progress">
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
                    <div>Unit ${unit} - (Page: ${num})</div>
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
                    location.assign(`/learn/${unit + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                window[`master_${vars[2]}`]();
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
}


function translate_beg() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$') + 2, cardm.length).split('__');
    var len_card_content = card_content.length;
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
            <div class="content">
                <div class="flex_center">${len.length}/${len_card_content}</div>
                <div id="cardm" class="cardm_learn">
                <div class="trans">
                    <div class="progress" id="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                    </div>
                    <div class="flex_center"><h1>${card_h}</h1></div>
                    <div class="line"></div>
                    <div class="flex_center">${meaning}</div>
                </div>
                <div id="check">Check</div>
            </div>
        `;

    var buttons_array = [];

    $('button').on('click', function () {
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();

        if (buttons_array.includes(thiss_text)) {
            buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
            for (x in buttons_array) {
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color': '#cccccc',
                'color': '#222222'
            })
            if (buttons_array.length == 0) {
                $('#check').css({
                    'display': 'none'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        } else {
            buttons_array.push(thiss_text);
            for (x in buttons_array) {
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color': 'rgb(60, 179, 114, 0.95)',
                'color': '#f1f1f1'
            })
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline-block'
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
                navigate('next');
            } else {
                window[`master_${vars[2]}`]();
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
function translate_int() {
    var vars = arguments;
    var cardm = vars[0];
    card_title = cardm.slice(0, cardm.indexOf('$$'));
    var card_content = cardm.slice(cardm.indexOf('$$') + 2, cardm.length).split('__');
    var len_card_content = card_content.length;
    var randline = Math.floor(Math.random() * (len_card_content));
    var progress = Math.round((100 / len_card_content) * len.length);
    while (len.includes(randline)) {
        var randline = Math.floor(Math.random() * (len_card_content - 0)) + 0;
    }
    var card = card_content[randline].trim();
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
    // var card_title = card.slice(0,card.indexOf('$$'))
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
        <div class="content">
            <div class="flex_center">${len.length}/${len_card_content}</div>
            <div id="cardm" class="cardm_learn">
            <div class="trans">
                <div class="progress" id="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="transition:all 0.5s ease;width:${progress}%;">${progress}% Complete</div>
                </div>
                <div class="flex_center"><h1>${card_h}</h1></div>
                <div class="line"></div>
                <div class="flex_center">${meaning}</div>
            </div>
            <div id="check">Check</div>
        </div>
        `;

    var buttons_array = [];

    $('button').on('click', function () {
        var buttons = ``;
        var thiss = $(this);
        var thiss_text = thiss.text();

        if (buttons_array.includes(thiss_text)) {
            buttons_array.splice(buttons_array.indexOf(thiss_text), 1);
            for (x in buttons_array) {
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color': '#cccccc',
                'color': '#222222'
            })
            if (buttons_array.length == 0) {
                $('#check').css({
                    'display': 'none'
                })
            }
            $('.line').html(buttons); //=document.querySelector('.line').innerHTML = buttons;
        } else {
            buttons_array.push(thiss_text);
            for (x in buttons_array) {
                buttons += `<button class="nfocus">${buttons_array[x]}</button>`;
            }
            thiss.css({
                'background-color': 'rgb(60, 179, 114, 0.95)',
                'color': '#f1f1f1'
            })
            if (buttons_array.length > 0) {
                $('#check').css({
                    'display': 'inline-block'
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

    $('#check').on('click', function () {
        if (buttons_array.join() == card_order.join()) {
            len.push(randline);
            prompt.style.display = "block";
            $('#prm').css({
                "background-color": "rgb(60, 179, 114, 0.95)",
                "animation": "prm 1.5s ease 0ms 1 normal forwards"
            });
            prm.innerHTML = `${wish[Math.floor(Math.random() * (wish.length - 0)) + 0]}`;
            if (len.length == len_card_content) {
                len = [];
                if (vars[4] == 1) {
                    location.assign(`/learn/${unit + 1}`);
                } else {
                    navigate('next');
                }
            } else {
                window[`master_${vars[2]}`]();
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
function clk() {
    processval = (process.length > 3) ? `You can now go to the next page` : `Right!`;

    if (en.vowels.includes(arguments[0])) {
        if (process.includes(arguments[0]) == false) {
            process.push(arguments[0])
        }
        prompt.style.display = "block";
        prm.style.backgroundColor = "rgb(60, 179, 113)";
        prm.innerHTML = `${processval}`;
    } else {
        prompt.style.display = "block";
        prm.style.backgroundColor = "#555";
        prm.innerHTML = "Wrong!";
    }
} // 
function clkk() {
    prompt.style.display = "none";
} // important as it makes the prompt display again if not executed prompt wouldn't work
function warn() {
    prompt.style.display = "block";
    prm.style.backgroundColor = "#555";
    prm.innerHTML = "Please complete the lesson first!";
} // stops user from navigating to next page