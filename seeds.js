var User = require('./models/user.js');

var jon = new User({username: 'jon', location: 'Seoul'});
var jane = new User({username: 'jane', location: 'Chiang Mai'});

module.exports = function () {
  if (process.NODE_ENV != 'development') return;

  User.count({}, function (err, count) {
    if (count === 0) {
      jon.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
      jane.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};
