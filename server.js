var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var User = require('./src/user.js');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('YAY')
});

app.get('/', function(request, response){
  response.render('index', {user: null})
});

app.get('/signup', function(request, response){
  response.render('signup')
});

app.post('/sessions', function(request, response){
  new User({name: request.body.name,
            email: request.body.email,
            password: request.body.password 
            }).save(function() {
              response.render('index', {user: request.body.name})
            });
  
});

server.listen(3000, function(){
  console.log("Server listening on port 3000");
});

module.exports = server;