var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  iconHash: {
    type: String
  },
  twitter: {
    id: { type: Number },
    username: { type: String },
    tokenSecret: { type: String }
  },
  location: {
    city: { type: String },
    movedOn: { type: Date }
  }
});

module.exports = mongoose.model('User', userSchema);
