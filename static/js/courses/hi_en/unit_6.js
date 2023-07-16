// UNIT/LESSON VARIABLES
unit = 1;
lesson = 6;

en = {
    alphabet:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    consonants:["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"],
    vowels:["a","e","i","o","u"]
};

// FUNCTIONS/MASTERS
function masters(){
    var vars = arguments;
    var masters_list = [
        function (){//PRESENT SIMPLE NEGATIVE DEF...
            navig(1);
            var card_title = "Present Simple";
            body.innerHTML = `
                <div class="inf">
                    <div>Unit - ${unit}</div>
                    <div class="main">${card_title}</div>
                    <div>Lesson: ${num}</div>
                </div>
                <div class="content">
                    <div id="cardm" class="cardm_learn">
                        <div class="flex_column">
                            <div class="flex_center"><h1 class="color_primary">PRESENT SIMPLE</h1></div>
                            <div class="flex_center text_20">(NEGATIVE)</div>
                            <hr>
                        </div>
                        <div class="text_25">
                            <span class="">&#x2022; मौजूदा वक्त(present time) में बात करते हुए जब किसी शख्स(person) या चीज़(thing) की Information(सूचना) नही के साथ देते हैं, जैसे की... उस Person/Thing का Name, Quality, Location etc.</span><br><br>
                            <span class="">&#x2022; Examples:- आप अध्यापक नहीं हो, हम छात्र नहीं हैं, वह मेरा दोस्त नही है, वह एक इमानदार आदमी नही है, मैं अमेरिका में नही हूँ etc.</span><br><br>
                            <span class="">&#x2022; ऐसे Sentences(वाक्य) को Present Simple (Negative) कहते हैं और ऐसे Sentences में Object(information) से पहले "Not" का use करते हैं।</span>
                        </div>
                        <div class="flex_column">
                            <div class="flex_center"><h2 class="bg_grey p_10 bdr_r_8">Formula: [ Subject + Helping Verb + Not + Object(information) ]</h2></div>
                            <div class="flex_sp">
                                <div><ul>
                                    <li>I am not a liar</li>
                                    <li>You are not a boy</li>
                                    <li>We are not teachers</li></ul>
                                </div>
                                <div><ul>
                                    <li>He is not...</li> 
                                    <li>She is not...</li>
                                    <li>They are not...</li></ul>
                                </div>
                                <div><ul>
                                    <li>it is not...</li>
                                    <li>this is not...</li>
                                    <li>these are not...</li></ul>
                                </div>
                                <div><ul>
                                    <li>that is not...</li>
                                    <li>those are not...</li></ul>
                                </div>
                            </div>
                        </div>
                        <span class="text_25"></span>
                    </div>
                </div>
            `;
        },
        function (){//PRESENT SIMPLE INTERROGATIVE DEF...
            navig(1);
            var card_title = "Present Simple";
            body.innerHTML = `
                <div class="inf">
                    <div>Unit - ${unit}</div>
                    <div class="main">${card_title}</div>
                    <div>Lesson: ${num}</div>
                </div>
                <div class="content">
                    <div id="cardm" class="cardm_learn">
                        <div class="flex_column">
                            <div class="flex_center"><h1 class="color_primary">PRESENT SIMPLE</h1></div>
                            <div class="flex_center text_20">(INTERROGATIVE)</div>
                            <hr>
                        </div>
                        <div class="text_25">
                            <span class="">&#x2022; मौजूदा वक्त(present time) में बात करते हुए जब किसी शख्स(person) या चीज़(thing) की Information(सूचना) पूछते हैं, जैसे की... उस Person/Thing का Name, Quality, Location etc. और पूछते हुए वाक्य के शुरू में "क्या" का use करते हैं</span><br><br>
                            <span class="">&#x2022; Examples:- क्या आप अध्यापक हो, क्या हम छात्र हैं, क्या वह मेरा दोस्त है, क्या वह एक इमानदार आदमी है, क्या मैं घर में हूँ etc.</span><br><br>
                            <span class="">&#x2022; ऐसे Sentences(वाक्य) को Present Simple (Interrogative) कहते हैं और ऐसे Sentences में Helping Verbs को शुरू में लिखते हैं।</span>
                        </div>
                        <div class="flex_column">
                            <div class="flex_center"><h2 class="bg_grey p_10 bdr_r_8">Formula: [ Helping Verb + Subject + Object(information)? ]</h2></div>
                            <div class="flex_sp">
                                <div><ul>
                                    <li>Am I not a liar</li>
                                    <li>Are You not a boy</li>
                                    <li>Are We not teachers</li></ul>
                                </div>
                                <div><ul>
                                    <li>Is he not...</li> 
                                    <li>Is She not...</li>
                                    <li>Are They are not...</li></ul>
                                </div>
                                <div><ul>
                                    <li>Is it not...</li>
                                    <li>Is this not...</li>
                                    <li>Are these not...?</li></ul>
                                </div>
                                <div><ul>
                                    <li>Is that not...?</li>
                                    <li>Are those ...?</li></ul>
                                </div>
                            </div>
                        </div>
                        <span class="text_25"></span>
                    </div>
                </div>
            `;
        },
        function (){//PRESENT SIMPLE INTERROGATIVE WH-TYPE DEF...
            navig(1);
            var card_title = "Present Simple";
            body.innerHTML = `
                <div class="inf">
                    <div>Unit - ${unit}</div>
                    <div class="main">${card_title}</div>
                    <div>Lesson: ${nump}</div>
                </div>
                <div class="content">
                    <div id="cardm" class="cardm_learn">
                        <div class="flex_column">
                            <div class="flex_center"><h1 class="color_primary">PRESENT SIMPLE</h1></div>
                            <div class="flex_center text_20">(INTERROGATIVE WH-TYPE)</div>
                            <hr>
                        </div>
                        <div class="text_25">
                            <span class="">&#x2022; मौजूदा वक्त(present time) में बात करते हुए जब किसी शख्स(person) या चीज़(thing) की Information(सूचना) पूछते हैं, जैसे की... उस Person/Thing का Name, Quality, Location etc. और पूछते हुए Sentence में <span class="color_primary">Question Words</span> (What, When, Where) का use करते हैं</span><br><br>
                            <span class="">&#x2022; Examples:- आप कैसे हो, हम कहाँ हैं?, वह लड़का कौन है?, आप गुस्सा क्यों हो? etc.</span><br><br>
                            <span class="">&#x2022; ऐसे Sentences(वाक्य) को Present Simple (Interrogative) कहते हैं और ऐसे Sentences में Question Words और <span class="color_primary" onclick="toggleModal()">Helping Verbs</span> को शुरू में लिखते हैं।</span>
                        </div>
                        <div class="flex_column">
                            <div class="flex_center"><h2 class="bg_grey p_10 bdr_r_8">Formula: [ Question Word + Helping Verb + Subject + Object(information)? ]</h2></div>
                            <div class="flex_sp">
                                <div><ul>
                                    <li>Who am I</li>
                                    <li>Who are you</li>
                                    <li>Where are we</li></ul>
                                </div>
                                <div><ul>
                                    <li>How is he...</li> 
                                    <li>is she...</li>
                                    <li>Are They are not...</li></ul>
                                </div>
                                <div><ul>
                                    <li>What is it...</li>
                                    <li>What is this...</li>
                                    <li>What are these...?</li></ul>
                                </div>
                                <div><ul>
                                    <li>Is that not...?</li>
                                    <li>are those ...?</li></ul>
                                </div>
                            </div>
                        </div>
                        <span class="text_25"></span>
                    </div>
                </div>
            `;
        },
        function (){//FUTURE SIMPLE NEGATIVE DEF...
            navig(1);
            var card_title = "Future Simple";
            body.innerHTML = `
                <div class="inf">
                    <div>Unit - ${unit}</div>
                    <div class="main">${card_title}</div>
                    <div>Lesson: ${nump}</div>
                </div>
                <div class="content">
                    <div id="cardm" class="cardm_learn">
                        <div class="flex_column">
                            <div class="flex_center"><h1 class="color_primary">FUTURE SIMPLE</h1></div>
                            <div class="flex_center text_20">(NEGATIVE)</div>
                            <hr>
                        </div>
                        <div class="text_25">
                            <span class="">&#x2022; मौजूदा वक्त(present time) में बात करते हुए जब किसी शख्स(person) या चीज़(thing) की Information(सूचना) नही के साथ देते हैं, जैसे की... उस Person/Thing का Name, Quality, Location etc.</span><br><br>
                            <span class="">&#x2022; Examples:- आप अध्यापक नहीं हो, हम छात्र नहीं हैं, वह मेरा दोस्त नही है, वह एक इमानदार आदमी नही है, मैं अमेरिका में नही हूँ etc.</span><br><br>
                            <span class="">&#x2022; ऐसे Sentences(वाक्य) को Present Simple (Negative) कहते हैं और ऐसे Sentences में Object(information) से पहले "Not" का use करते हैं।</span>
                        </div>
                        <div class="flex_column">
                            <div class="flex_center"><h2 class="bg_grey p_10 bdr_r_8">Formula: [ Subject + Helping Verb + Not + Object(information) ]</h2></div>
                            <div class="flex_sp">
                                <div><ul>
                                    <li>I am not a liar</li>
                                    <li>You are not a boy</li>
                                    <li>We are not teachers</li></ul>
                                </div>
                                <div><ul>
                                    <li>He is not...</li> 
                                    <li>She is not...</li>
                                    <li>They are not...</li></ul>
                                </div>
                                <div><ul>
                                    <li>it is not...</li>
                                    <li>this is not...</li>
                                    <li>these are not...</li></ul>
                                </div>
                                <div><ul>
                                    <li>that is not...</li>
                                    <li>those are not...</li></ul>
                                </div>
                            </div>
                        </div>
                        <span class="text_25"></span>
                    </div>
                </div>
            `;
        },
        function(){
            var x = english.pronouns;
            var y = [0,1];
            button_prompt_whole_content(x,y,0,3,0);
        },
        function (){//PRESENT SIMPLE DEFINITION
            navig(1);
            var card_title = "Present Simple";
            body.innerHTML = `
                <div class="inf">
                    <div>Unit - ${unit}</div>
                    <div class="main">${card_title}</div>
                    <div>Lesson: ${num}</div>
                </div>
                <div class="content">
                    <div id="cardm" class="cardm_learn">
                        <div class="flex_column">
                            <div class="flex_center"><h1 class="color_primary">PRESENT SIMPLE</h1></div>
                            <div class="flex_center text_20">(affirmative)</div>
                            <hr>
                        </div>
                        <span class="text_25">मौजूदा वक्त(present time) में बात करते हुए जब किसी शख्स(person) या चीज़(thing) की Information(सूचना) देते या बताते हैं, जैसे की... उस Person/Thing का Name, Quality, Location etc.</span>
                        <span class="text_25">जैसे:- आप अध्यापक हो, हम छात्र हैं, वह मेरा दोस्त है, वह एक इमानदार आदमी है, मैं इंडिया में हूँ etc.</span>
                        <span class="text_25">ऐसे Sentences(वाक्य) को Present Simple कहते हैं और ऐसे Sentences में SUBJECT के साथ Present Simple की <a href="">Helping Verbs</a> (is, am, are) में से कोई एक use करते हैं।</span>
                        <div class="flex_column">
                            <div class="flex_center"><h2 class="bg_grey p_10 bdr_r_8">Formula: [ Subject + Helping Verb + Object(information) ]</h2></div>
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
                        <span class="text_25">I के साथ "am", You के साथ "are" बाकी सभी singulars के साथ "is" और plurals के साथ "are" का use करते हैं।</span>
                    </div>
                </div>
            `;
        },
        function(){
            var x = english.present_simple.sentences.affirmative.i;
            var y = [0,1];
            translate_beg(x,y,0,5,0);
        },
        function(){
            var x = english.pronouns;
            var y = [1,3];
            card_prompt(x,y,0,6,0);
        },
        function(){
            var x = english.pronouns;
            var y = [1,3];
            button_prompt_whole_content(x,y,0,7,0);
        },
        function(){
            var x = english.present_simple.sentences.affirmative.you;
            var y = [0,1];
            translate_beg(x,y,0,8,0);
        },
        function(){
            var x = english.present_simple.sentences.affirmative.i;
            var y = [1,2];
            translate_beg(x,y,0,9,0);
        },
        function(){
            var x = english.pronouns;
            var y = [3,4];
            card_prompt(x,y,0,9,0);
        },
        function(){
            var x = english.pronouns;
            var y = [3,4];
            button_prompt_whole_content(x,y,0,10,0);
        },
        function(){
            var x = english.present_simple.sentences.affirmative.we;
            var y = [0,2];
            translate_beg(x,y,0,11,0);
        },
        function (){
            var x = english.present_simple.sentences.affirmative.you;
            var y = [1,2];
            translate_beg(x,y,0,8,0);
        },
        function(){
            var x = english.present_simple.sentences.affirmative.i;
            var y = [2,3];
            translate_beg(x,y,0,13,0);
        },
        function(){
            var x = english.present_simple.sentences.affirmative.we;
            var y = [2,3];
            translate_beg(x,y,0,14,0);
        },
        function(){
            var x = english.present_simple.hv;
            var y = [0,3];
            hv_prompt(x,y,0,15,0);
        },
        function(){
            var xx = english.present_simple.sentences.affirmative;
            var x = xx.we.concat(xx.i.slice(1,2),xx.you.slice(1,2));
            var y = [0,0];
            return translate_med(x,y,0,16,1);
        }
    ];
    masters_list[vars[0]]();
    maxNum = masters_list.length-1;
}