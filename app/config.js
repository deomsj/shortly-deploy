var mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/shortlydb');
var db = mongoose.connection;
db.once('open', function () {
  console.log('Connection has been made, now make fireworks...');
  //done();
}).on('error', function (error) {
  console.log('Connection error:', error);
});

module.exports = db;
