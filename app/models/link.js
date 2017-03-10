var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var LinkSchema = mongoose.Schema({
  url: { type: String, required: true },
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', LinkSchema);

LinkSchema.pre('validate', true, function(next){
  console.log('link model 16: ', this);
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Link;
