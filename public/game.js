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

function clear(){
    findElement('#computer').innerHTML= "";
    findElement('#user').innerHTML= "";
    findElement('#content-anim').innerHTML= "";
}

function setMode( mode ){
    fetch(`/mode/${mode}`, {method: 'POST'})
    .then( (response) => response.json() )
    .then( (response) => console.log( response ) )
}


function play( element ){
    clear();

    var data = new FormData();
    data.append('element', element);
    fetch(`/play`, {method: 'PUT', headers:{ 'content-type': 'application/json' }, body: JSON.stringify( { element: element } )  })
    .then( (response) => response.json() )
    .then( (response) => { console.log( response ); checkWins( response );  } );
}

function checkWins( obj ){
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

   // obj.computerSelect.key
}


function showMessage( msg ){
    findElement('#content-msg').innerHTML = `<b class="msg">${msg}</b>`;
}