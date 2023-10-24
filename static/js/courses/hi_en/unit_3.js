// UNIT/LESSON VARIABLES
unit = 1;
lesson = 3;


// FUNCTIONS/LESSONS
function masters() {
    var vars = arguments;
    var masters_list = [
        function () {//1. WRD5 FATHER
            var x = english.words.w_5.word;
            var y = [0, 0];
            wcard_prompt_beg(x, y, 0, 1, 0);
        },  function () {//2. WRD5 FATHER
            var x = english.words.w_5.word;
            var y = [0, 0];
            wbutton_prompt_reverse(x, y, 0, 2, 0);
        },
        function () {//3. SNT5 FATHER
            var x = english.units.unit_3.sentences.r_1;
            var y = [0, 0];
            translate_beg_conf(x, y, 0, 3, 0);
        },
        function () {//4. WRD5 FATHER
            var x = english.words.w_6.word;
            var y = [0, 0];
            wcard_prompt_beg(x, y, 0, 1, 0);
        },  function () {//5. WRD5 FATHER
            var x = english.words.w_6.word;
            var y = [0, 0];
            wbutton_prompt_reverse(x, y, 0, 2, 0);
        },
        function () {//6. SNT5 FATHER
            var x = english.units.unit_3.sentences.r_2;
            var y = [0, 0];
            translate_beg_conf(x, y, 0, 3, 0);
        },
        function () {//6. SINGULAR/PLURAL DEF...
            navig(1);
            var card_title = "COUNTABLE/UNCOUNTABLE NOUNS";
            body.innerHTML = `
                <div class="inf">
                    <div>lesson - ${unit}</div>
                    <div class="main">${card_title}</div>
                    <div>page: ${num}</div>
                </div>
                <div class="content">
                    <div id="cardm" class="cardm_learn">
                        ${english.singular_plural_def}
                    </div>
                </div>
            `;
        },
        function (){//
            var x = english.pronouns.we.sentences.affirmative;
            var y = [2,3];
            translate_beg(x,y,0,14,0);
        },
        function (){
            var x = english.present_simple.hv;
            var y = [0,3];
            hv_prompt(x,y,0,15,0);
        },
        function () {//1. he
            var x = english.pronouns.he.word;
            var y = [0,0];
            card_prompt(x, y, 0, 1, 0);
        },
        function () {//2. he bt_pr
            var x = english.pronouns;
            var y = [4, 5];
            button_prompt_whole_content(x, y, 0, 2, 0);
        },
        function () {//3. he tr_beg
            var x = english.present_simple.sentences.affirmative.he;
            var y = [0, 1];
            translate_beg(x, y, 0, 3, 0);
        },
        function () {//4. HE/SHE DEF...
            navig(1);
            var card_title = "PERSONAL PRONOUNS (HE/SHE)";
            body.innerHTML = `
                <div class="inf">
                    <div>Unit - ${unit}</div>
                    <div class="main">${card_title}</div>
                    <div>Lesson: ${nump}</div>
                </div>
                <div class="content">
                    <div id="cardm" class="cardm_learn">
                        ${english.he_she_def}
                    </div>
                </div>
            `;
        },
        function () {//she
            var x = english.pronouns;
            var y = [5, 6];
            card_prompt(x, y, 0, 4, 0);
        },
        function () {//she bt_pr
            var x = english.pronouns;
            var y = [5, 6];
            button_prompt_whole_content(x, y, 0, 5, 0);
        },
        function () {//she tr_beg
            var x = english.present_simple.sentences.affirmative.she;
            var y = [0, 1];
            translate_beg(x, y, 0, 6, 0);
        },
        function () {//he tr_beg
            var x = english.present_simple.sentences.affirmative.he;
            var y = [1, 2];
            translate_beg(x, y, 0, 3, 0);
        },
        function (){
            var xx = english.present_simple.sentences.affirmative;
            var x = xx.he.concat(xx.she.slice(1,2),xx.we.slice(1,2));
            var y = [0,0];
            translate_med(x,y,0,16,1);
        },
        function () {//W3 FATHER
            var x = english.words.w_3.word;
            var y = [0, 0];
            wcard_prompt(x, y, 0, 1, 0);
        },
        function () {//W3 FATHER bt_pr
            var x = english.words.w_3.word;
            var y = [0, 0];
            wbutton_prompt_whole_content(x, y, 0, 1, 0);
        },
        function () {//W3 FATHER tr_beg
            var x = english.words.w_3.sentences.affirmative;
            var y = [0, 0];
            translate_beg(x, y, 0, 9, 0);
        },
        function () {//they
            var x = english.pronouns;
            var y = [6, 7];
            card_prompt(x, y, 0, 7, 0);
        },
        function () {//they
            var x = english.pronouns;
            var y = [6, 7];
            button_prompt_whole_content(x, y, 0, 8, 0);
        },
        function () {//they tr_beg
            var x = english.present_simple.sentences.affirmative.they;
            var y = [0, 1];
            translate_beg(x, y, 0, 9, 0);
        },
        function () {//she tr_beg
            var x = english.present_simple.sentences.affirmative.she;
            var y = [1, 2];
            translate_beg(x, y, 0, 6, 0);
        },
        function () {//he tr_beg
            var x = english.present_simple.sentences.affirmative.he;
            var y = [2, 3];
            translate_beg(x, y, 0, 3, 0);
        },
        function () {//hv exercise
            var x = english.present_simple.hv;
            var y = [0, 0];
            return hv_prompt(x, y, 0, 10, 0);
        },
        function () {
            var xx = english.present_simple.sentences.affirmative;
            var x = xx.he.concat(xx.she, xx.they);
            var y = [0, 0];
            return translate_begg(x, y, 0, 9, 1);
        }
    ];
    masters_list[vars[0]]();
    maxNum = masters_list.length - 1;
}