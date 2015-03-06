var User = require('../../src/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

var webdriverio = require('webdriverio');
var expect = require('chai').expect;

describe('homepage', function(){

  var client;

  before(function(done){
    client = {};
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
    client.init(done)
  });

  after(function(done){
    // mongoose.connection.db.dropDatabase()
    client.end(done);
  });

  function userSignsUp(client){
    client
      .url('http://localhost:3000')
      .click('#signup')
      .waitForVisible('#signup_form', 2000)
      .setValue('#name', 'mishal')
      .setValue('#email', 'mishal@mishal.com')
      .setValue('#password', 'mishal')
      .click('#sign_up_submit')
  }

  it('user logs in', function(done){
    this.timeout(8000);
      userSignsUp(client)
    client
      .getText('#welcome-message', function(err, text){
        expect(text).to.equal('Welcome mishal')
      })

    .call(done);
  })

  it('once a user is signed in then they should be able to sign out', function(done){
    this.timeout(8000);
    // userSignsUp(client)
    client
      .url('http://localhost:3000')
      .click('#sign_out')
      .waitForVisible('#signup', 5000)
    .call(done);
  });

  it('a user must enter their name, email and password', function(done){
    this.timeout(8000);
    client
      .url('http://localhost:3000')
      .click('#signup')
      .waitForVisible('#signup_form', 2000)
      .click('#sign_up_submit')
      .getText('body', function(err, text){
        expect(text.indexOf('ERROR') > -1).to.equal(true)
      })
    .call(done);
  })

  it('a user\'s email must be unique', function(done){
    this.timeout(8000);
    mongoose.connection.db.dropDatabase()
    client
      .url('http://localhost:3000')
    userSignsUp(client)
    client
      .click('#sign_out')
    userSignsUp(client)
    client
      .waitForVisible('#signup_form', 2000)
    .call(done);
  })

});