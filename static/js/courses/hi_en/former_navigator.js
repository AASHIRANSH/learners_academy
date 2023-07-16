function navigate(pn){
    len = [];
    navig(2);
    if (pn=='next'){
        num = num==maxNum?maxNum:num += 1;
        window[`master_${num}`]();
    }

    if (pn=='prev'){
        num = num==1?1:num -= 1;
        window[`master_${num}`]();
    }
};navigate('prev');


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