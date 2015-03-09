var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var User = require('./src/user.js');

var session = require('express-session');
app.use(session({secret: 'cat'}));

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

app.get('/', function(request, response){
  var user = currentUser()
  response.render('index', {user: user})
});

app.get('/signup', function(request, response){
  response.render('signup', {message: null})
});

app.post('/sessions', function (request, response){
    var user = new User({name: request.body.name,
                      email: request.body.email,
                      password: request.body.password
                    }).save(function (err, user){
                      if(err){
                        response.render('signup', {message: 'ERROR'})
                      } else {
                        session.user = user;
                        var user = currentUser()
                        response.render('index', {user: user, name: user.name});
                      }
                    });
          
});

app.get('/signout', function(request, response){
  session.user = null;
  response.redirect('/')  
});

app.get('/signin', function(request, response){
  response.render('signin', {message: null})
});

app.post('/new', function(request, response){
  User.findOne({email: request.body.email}, function(err, user){
    if(user){
      var logIn = user.passwordMatch(request.body.password, function(err, match){
        if(match){
          session.user = user;
          response.render('index', {user: user, name: user.name});
        } else {
          response.render('signin', {message: 'Incorrect password'})
        }
      })
    } else {
      response.render('signin', {message: 'User doesn\'t exist'})
    }
  });
});

function currentUser(){
  if(session.user){
    return session.user
  } else {
    return null
  }
}


server.listen(3000, function(){
  console.log("Server listening on port 3000");
});

module.exports = server;