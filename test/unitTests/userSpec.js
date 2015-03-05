var User = require('../../src/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_env');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('YAY')
});

describe('user', function(){

  it('can be saved', function(done){
    new User({names: "mishal",
              email: "email",
              password: "password"
              }).save(done)
  })

  afterEach(function(){
    mongoose.connection.db.dropCollection('User', function(err, result) {...});
    // mongoose.connection.db.users.drop()
  });

});