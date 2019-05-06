const getDivTop = (element,withScroll=false,fromWindow=false)=>{
    let yPos;
    if(withScroll) {
        if(fromWindow){
            yPos = $(element).offset().top - $(window).height();
            console.log(yPos);
        }else {
            yPos = $(element).offset().top;
        }
    }else{
        yPos = $(element).position().top;
    }
    return yPos;
};
let scrolling=false;
const scrollTo = yPos =>{
    $('html,body').animate({
            scrollTop: yPos
        }, 600,()=>{scrolling=false;});
};
$('#jumpDown').click(()=>{
    if(!scrolling) {
        scrolling = true;
        let nextPage;
        $(".page").each((index, curDiv) => {
            if (getDivTop(curDiv) > getDivTop($("#jumpDown"), true)) {
                nextPage = curDiv;
                return false;
            }
        });
        if (nextPage) {
            scrollTo(getDivTop(nextPage));
        } else {
            scrollTo(getDivTop($('.page').slice(-1)));
        }
    }
});
$('#jumpUp').click(()=>{
    if(!scrolling) {
        let nextPage;
        $(".page").each((index, curDiv) => {
            if (getDivTop(curDiv) < getDivTop($("#jumpUp"), true)) {
                nextPage = index;
            }
        });
        if (nextPage) {
            scrollTo(getDivTop($(".page")[nextPage - 1]));
            scrolling = true;
        }
    }
});