var dataReturn = {};

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

function anim( name ){
    findElement('#content-anim').innerHTML= "";
    var animNext = lottie.loadAnimation({
        container: findElement('#content-anim'), 
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: `static/anim/${name}.json`,
        onComplete: () => { findElement('#content-anim').innerHTML= ""; }, 
        onLoopComplete: () => { findElement('#content-anim').innerHTML= ""; } 
    });
    animNext.addEventListener('complete',()=>{
        //animNext.destroy();  
        //findElement('#content-anim').innerHTML= "";  
    } );
}


function setMode( mode ){
    fetch(`/mode`, {
        method: 'PUT', 
        headers:{ 'content-type': 'application/json' }, 
        body: JSON.stringify( { mode: mode } ) 
     })
    .then( (response) => response.json() )
    .then( (response) => console.log( response ) )
}

function clear(){
    findElement('#computer').innerHTML= "";
    findElement('#user').innerHTML= "";
    findElement('#content-anim').innerHTML= "";
}



function play( element ){
    clear();

    var data = new FormData();
    data.append('element', element);
    fetch(`/play`, {
        method: 'PUT', 
        headers:{ 'content-type': 'application/json' }, 
        body: JSON.stringify( { element: element } ) 
     })
    .then( (response) => response.json() )
    .then( (response) => { console.log( response ); checkWins( response );  } );
}

function mountHistory(){
    const hist = dataReturn.history;
    const dataMap = hist.map( (item, i) => { 
        var user = 0;
        var computer =0;
        for (let i = 0; i < item.matches.length; i++) 
            if ( item.matches[i] == 'user' )
                user++;
            else if ( item.matches[i] == 'computer' )
                computer++; 

        return {
            wins: user > computer ? 'user' : 'computer',
            scoreboard: { 
                user:user, 
                computer: computer 
            }, 
            date: item.date 
        }         
    });
   
    console.log( dataMap );
    calcScoreboard(dataMap);

}

function calcScoreboard(score){
    var user = 0;
    var computer = 0;
    for (let i = 0; i < score.length; i++) 
        if ( score[i].wins == 'user' )
            user++;
        else if ( score[i].wins == 'computer' )
            computer++; 

    findElement('#content-scoreboard').innerHTML = `${computer} x ${user}`;       
}

function checkWins( obj ){
    dataReturn = obj;
    mountHistory();
    
    findElement('#computer').innerHTML= "<img src=\"static/img/"+obj.computerSelect.key+".png\">";
    findElement('#user').innerHTML= "<img src=\"static/img/"+obj.userSelect.key+".png\">";

    switch(obj.wins){
        case 'user' :
            anim('fireworks');
            showMessage( "Você Ganhou" );
            break;

        case 'computer' :
            //anim('lf30_editor_fdgpYc');
            showMessage( "Você Perdeu" );
        break;

        case 'empate' :
                showMessage( "Deu Empate" );    
        break;
    }

}


function showMessage( msg ){
    findElement('#content-msg').innerHTML = `<b class="msg">${msg}</b>`;
}

function openMenu(){
    findElement('#content-msg').innerHTML = '';
    findElement("#main").classList.toggle("open-menu");
}
