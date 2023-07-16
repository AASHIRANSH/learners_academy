// UNIT/LESSON VARIABLES
unit = 1;
lesson = 2;


// FUNCTIONS/LESSONS
// test("/static/img/svg/teacher.svg"),//img validater, checks if an image exists
function masters() {
    var vars = arguments;
    var masters_list = [
        function () {//1. WRD3 BOY
            var x = english.words.w_3.word;
            var y = [0, 0];
            wcard_prompt_beg(x, y, 0, 1, 0);
        },
        function () {//2. WRD3 BOY
            var x = english.words.w_3.word;
            var y = [0, 0];
            wbutton_prompt_reverse(x, y, 0, 1, 0);
        },
        function () {//3. SNT3 BOY
            var x = english.words.w_3.sentences.affirmative;
            var y = [0, 1];
            translate_beg_conf(x, y, 0, 3, 0);
        },
        function (){//4. YOU
            var x = english.pronouns.you.word;
            var y = [0,0];
            card_prompt_beg_img(x,y,0,4,0);
        },
        function (){//5. YOU
            var x = english.pronouns.you.word;
            var y = [0,0];
            button_prompt_reverse(x,y,0,13,0);
        },
        function (){//6. HV YOU
            var x = english.present_simple.hv;
            var y = [1,2];
            hv_prompt(x,y,0,15,0);
        },
        function (){//7. SNT YOU
            var x = english.pronouns.you.sentences.affirmative;
            var y = [0,1];
            translate_beg(x,y,0,17,0);
        },
        function (){//8. w3
            var x = english.words.w_3.sentences.affirmative;
            var y = [1,2];
            translate_beg(x,y,0,17,0);
        },
        function () {//9. WRD4 GIRL
            var x = english.words.w_4.word;
            var y = [0, 0];
            wcard_prompt_beg(x, y, 0, 8, 0);
        },
        function () {//10. WRD4 GIRL
            var x = english.words.w_4.word;
            var y = [0, 0];
            wbutton_prompt_reverse(x, y, 0, 8, 0);
        },
        function (){//11. W4
            var x = english.words.w_4.sentences.affirmative;
            var y = [1,2];
            translate_beg(x,y,0,17,0);
        },
        function () {//12. COORD-CONJUCTIONS 1/8 AND
            var x = english.conjuctions.coordinating.and.word;
            var y = [0, 0];
            card_prompt_beg(x, y, 0, 1, 0);
        },
        function () {//13. COORD-CONJUCTIONS 1/8 bt_pr AND
            var x = english.conjuctions.coordinating.and.word;
            var y = [0, 1];
            button_prompt_reverse(x, y, 0, 1, 0);
        },
        function () {//14. 1/8 tr_beg AND COORD-CONJUCTIONS
            var x = english.conjuctions.coordinating.and.sentences.affirmative;
            var y = [0, 2];
            translate_beg(x, y, 0, 1, 0);
        },
        function () {//15.
            var x = english.db.units.unit_1[0].slice(0,1);
            x.push(english.words.w_1.word[0][0]);
            x.push(english.words.w_2.word[0][0]);
            var y = [0,0];
            match_prompt(x, y, 0, 18, 1);
        },
    ];
    masters_list[vars[0]]();
    maxNum = masters_list.length - 1;
}