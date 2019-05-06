
const scrollBar = $('#ScrollBar');
const jumpUpButton = $('#jumpUp');
const jumpDownButton = $('#jumpDown');
const pages = $(".page");


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

jumpDownButton.click(()=>{
    if(!scrolling) {
        scrolling = true;
        let nextPage;
        pages.each((index, curDiv) => {
            if (getDivTop(curDiv) > getDivTop(jumpDownButton, true)) {
                console.log(getDivTop(curDiv) - getDivTop(jumpDownButton, true));
                if(getDivTop(curDiv) - getDivTop(jumpDownButton, true) < 50){
                    nextPage = curDiv;
                    return false;
                }else{
                    nextPage = pages[index-1];
                    return false;
                }
            }
        });
        if (nextPage) {
            scrollTo(getDivTop(nextPage));
        } else {
            scrollTo(getDivTop(pages.slice(-1)));
        }
    }
});
jumpUpButton.click(()=>{
    if(!scrolling) {
        let nextPage;
        pages.each((index, curDiv) => {
            if (getDivTop(curDiv) < getDivTop(jumpUpButton, true)) {
                console.log(getDivTop(curDiv) - getDivTop(jumpUpButton, true));
                if (getDivTop(curDiv) - getDivTop(jumpUpButton, true) > 0) {
                    console.log('here');
                    nextPage = index-1;
                }else{
                    nextPage=index;
                }
            }
        });
        if (nextPage) {
            scrollTo(getDivTop($(".page")[nextPage - 1]));
            scrolling = true;
        }
    }
});
const adjustScrollBar = e => {
    var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );

    let perc = Math.round(((window.scrollY)/(height-_docHeight))  *1000)/10;

    console.log(perc);
    scrollBar.width(perc+"%");
    perc<100?scrollBar.addClass("roundSB"):scrollBar.removeClass("roundSB");
};

const adjustPage = ()=>{
    let jumpButtons = $('#jumpDown, #jumpUp');
    if(window.innerWidth<480) {
        jumpButtons.removeClass('fa-3x');
        jumpButtons.addClass('fa-5x');
    }else{
        jumpButtons.removeClass('fa-5x');
        jumpButtons.addClass('fa-3x');
    }
    adjustScrollBar();
};
adjustPage();
window.onscroll = (e)=>{adjustScrollBar(e)};
window.onresize = (e)=>{adjustPage(e)};