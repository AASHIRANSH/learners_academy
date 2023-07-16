// LESSON/PAGE NAVIGATOR
function navigate(pn){
    navig(2);
    if (pn=='next'){
        len = [];
        num = num==maxNum?maxNum:num += 1;
        window["masters"](num);
    }

    if (pn=='prev'){
        len = [];
        num = num==0?0:num -= 1;
        window["masters"](num);
    }

    if (pn=='reload'){
        window["masters"](num);
    }
};navigate('prev');

//BOTTOM NAVIGATION BAR
function navig(){
    if (arguments[0]==1){
        navigation_b.innerHTML = `
            <div class="inff" id="inff">
            <div class="button" onclick="navigate('prev')" onmousedown="clkk()"><</div>
            <div class="button" onclick="navigate('next')" onmousedown="clkk()">></div>
            </div>
        `;
    }else{
        navigation_b.innerHTML = `<div></div>`;
    }
}