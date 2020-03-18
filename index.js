const express = require('express');
const app = express();
const game = require('./src/rules.js');
const session = require('express-session');
const bodyParser = require('body-parser');

//app.use(express.urlencoded());
app.use(express.json());


app.set('views','./views');
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.use(session({
  name: 'session',
  secret:'123456',  
  cookie: { //secure: true,
            //httpOnly: true,
            expires: new Date( Date.now() + 60 * 60 * 1000 )
          }
    ,saveUninitialized: true,resave: true        
  })
);

app.get('/', function (req, res) {
    req.session.currentGame = [];
    req.session.history = [];
    req.session.modeGame = 3; 
    res.render('home', { });
});

app.get('/reset', function (req, res) {
    req.session.currentGame = [];
    req.session.history = [];
    req.session.modeGame = 3; 
    res.json({});
});

app.put('/play', function (req, res) {
    const computer = game.computerOption();
    const userPlay = game.user(req.body.element );
    const session = req.session;
    const mode = req.session.modeGame;
    const isLastPlay = session.currentGame.length +1 == mode;
    const currentPlay = game.wins(userPlay, computer );

    session.currentGame.push(currentPlay);
    if ( isLastPlay ) {
        req.session.history.push({ 
            date: Date.now(), 
            matches: session.currentGame  
        });
        req.session.currentGame = [];
    }
    
    res.json({ 
        computerSelect:computer, 
        userSelect:userPlay,
        mode: mode,  
        wins: currentPlay, 
        history: req.session.history, 
        finishGame: isLastPlay, 
        currentGame:session.currentGame   
    });
});

app.post('/mode/:mode', function (req, res) {
    const session = req.session;
    session.modeGame = parseInt(req.params.mode);
    res.json( {  mode: session.modeGame  } );
});

app.get('/set', function (req, res) {
    const session = req.session;
    session.teste = 'testando a sessionStorage';
    res.json( { session } );
});

app.get('/get', function (req, res) {
    const session = req.session;
    res.json( { session } );
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});