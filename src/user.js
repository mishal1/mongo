var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  var that = this;
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(that.password, salt, function(err, hash){
      if(err) console.log(err);
      that.password = hash;
      next();
    });
  });
});

userSchema.methods.passwordMatch = function(password, callback){
  bcrypt.compare(password, this.password, function(err, match) {
    if(match){
      return callback(null, match)
    } else {
      return callback(err)
    }
  });
}

module.exports = mongoose.model('User', userSchema);