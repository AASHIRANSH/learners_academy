// UNIT/LESSON VARIABLES
unit = 1;
lesson = 4;


// FUNCTIONS/LESSONS
function masters() {
    var vars = arguments;
    var masters_list = [
        function () {//MY
            var x = english.possesive_determiners.my.word;
            var y = [0,0];
            card_prompt(x, y, 0, 7, 0);
        },
        function () {//MY
            var x = english.possesive_determiners.my.word;
            var y = [0,0];
            button_prompt(x, y, 0, 8, 0);
        },
        function () {//they
            var x = english.present_simple.sentences.affirmative.they;
            var y = [1, 2];
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
            return translate_med(x, y, 0, 9, 1);
        }
    ];
    masters_list[vars[0]]();
    maxNum = masters_list.length - 1;
}