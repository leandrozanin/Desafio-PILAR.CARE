var express = require('express');
var app = express();
var game = require('./src/rules.js');
const session = require('express-session');

app.set('views','./views');
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
    res.render('home', { });
});
//put
app.get('/play', function (req, res) {
    
    const computer = game.computerOption();
    console.log(  computer );
    res.json( { computerSelect:computer, wins: game.wins()   } );
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});