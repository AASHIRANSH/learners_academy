function navigate(pn){
    navig(2);
    if (pn=='next'){
        num = num==maxNum?maxNum:num += 1;
        window[`master_${num}`]();
        /*switch (num){
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
        }*/
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
    if (num==5){
        document.getElementById('inf').innerHTML = `
            <div class="inf">
                <div>Unit - ${unit}</div>
                <div>Lesson: ${num}</div>
            </div>
        `;
    }else{
        document.getElementById('inf').innerHTML = `
            <div class="inf">
                <div>Unit - ${unit}</div>
                <div>${card_title}</div>
                <div>Lesson: ${num}</div>
            </div>
        `;
    }
};navigate('prev');
function navig(){
    if (arguments[0]===1){
        navigation_b.innerHTML = `
            <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')" onmousedown="clkk()">Prev</div>
            <div class="button" onclick="navigate('next')" onmousedown="clkk()">Next</div>
            </div>
        `;
    }else{
        navigation_b.innerHTML = `<div></div>`;
    }
}