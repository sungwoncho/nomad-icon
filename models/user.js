var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String
  },
  location: {
    city: { type: String },
    movedOn: { type: Date }
  }
});

module.exports = mongoose.model('User', userSchema);
