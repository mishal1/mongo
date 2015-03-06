var User = require('../../src/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('YAY')
});

describe('user', function(){

  it('can be saved', function(done){
    new User({name: "TESTING",
              email: "email",
              password: "password"
              }).save(done)
  })

  afterEach(function(done){
    mongoose.connection.db.dropDatabase(done)
  });

});