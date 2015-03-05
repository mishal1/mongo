var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
});

userSchema.pre('save', function(next) {
  var that = this;
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(that.password, salt, function(err, hash){
      console.log(err)
      that.password = hash
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);