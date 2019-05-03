const getDivTop = (element,withScroll=false)=>{
    let yPos;
    yPos = withScroll ? $(element).offset().top : $(element).position().top;
    return yPos;
};
const scrollTo = yPos =>{
    $('html,body').animate({
            scrollTop: yPos
        }, 'slow');
};
$('#jumpDown').click(()=>{
    let nextPage;
    $(".page").each((index,curDiv)=>{
        if(getDivTop(curDiv) > getDivTop($("#jumpDown"),true)) {
            nextPage = curDiv;
            return false;
        }
    });
    if(nextPage)
        scrollTo(getDivTop(nextPage));
});
$('#jumpUp').click(()=>{
    let nextPage;
    $(".page").each((index,curDiv)=>{
        if(getDivTop(curDiv) < getDivTop($("#jumpUp"),true)) {
            nextPage = index;
        }
    });
    if(nextPage)
        scrollTo(getDivTop($(".page")[nextPage-1]));
});