function addEvent(to, type, fn){ 
    if(document.addEventListener){
        to.addEventListener(type, fn, false);
    } else if(document.attachEvent){
        to.attachEvent('on'+type, fn);
    } else {
        to['on'+type] = fn;
    }  
}; 
function findElement(el){
    return document.querySelector(el);
}

function wins(){
    lottie.loadAnimation({
        container: findElement('#content-anim'), 
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'static/anim/fireworks.json' 
    });
}