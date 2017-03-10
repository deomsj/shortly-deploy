var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: String
});

var User = mongoose.model('User', UserSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});


module.exports = User;
