describe('homepage', function(){

  beforeEach(function(){
    casper.start('http:localhost:3000/');
  })

  function fillForm(casper, booleanValue){
      casper.fill('#signup_form',{
      name: 'mishal',
      email: '1@1.com',
      password: 'password'
    }, booleanValue);
  }

  it('has sign up button', function(){
    casper.then(function(){
      expect("#signup").to.be.visible
      expect("#signup").to.contain.text('Sign up');
    });
  });

  it('when a user clicks the sign up page they are redirected to the sign up page', function(){
    casper.then(function(){
      this.click('#signup')
    });
    casper.then(function(){
      expect("#signup").to.not.be.visible
      expect("body").to.contain.text("Sign up")
    });
  });

  it('a user should be able to fill in the sign up form', function(){
    casper.then(function(){
      this.click('#signup')
    });
    casper.then(function(){
      fillForm(this, false)
    });
  });

  it('a user should be able to sign up', function(){
    casper.then(function(){
      this.click('#signup')
    });
    casper.then(function(){
      fillForm(this, true)
    });
    casper.then(function(){
      expect("body").to.contain.text("Welcome mishal")
    });
  });

});