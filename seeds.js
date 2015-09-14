var User = require('./models/user.js');

var jon = new User({
  username: 'jon',
  location: {
    city: 'Seoul',
    movedOn: new Date(2015, 0, 10)
  }});
var liz = new User({
  username: 'liz',
  location: {
    city: 'Melbourne',
    movedOn: new Date(2015, 7, 1)
  }});
var jane = new User({
  username: 'jane',
  location: {
    city: 'Chiang Mai',
    movedOn: new Date(2015, 8, 1)
  }});

module.exports = function () {
  if (process.env.NODE_ENV !== 'development') return;

  User.count({}, function (err, count) {
    if (count === 0) {
      jon.save(function (err) {
        if (err) console.log(err);
        console.log('Generated Jon');
      });
      jane.save(function (err) {
        if (err) console.log(err);
        console.log('Generated Jane');
      });
      liz.save(function (err) {
        if (err) console.log(err);
        console.log('Generated Liz');
      });
    }
  });
};
