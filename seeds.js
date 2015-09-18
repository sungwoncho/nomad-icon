var User = require('./models/user.js');

var jon = new User({
  iconHash: 'jon1',
  twitter: {
    id: 1,
    username: 'jon',
  },
  location: {
    city: 'Seoul',
    movedOn: new Date(2015, 0, 10)
  }});
var liz = new User({
  iconHash: 'liz1',
  twitter: {
    id: 2,
    username: 'liz',
  },
  location: {
    city: 'Seoul',
    movedOn: new Date(2015, 7, 1)
  }});
var jane = new User({
  iconHash: 'jane1',
  twitter: {
    id: 3,
    username: 'jane',
  },
  location: {
    city: 'Seoul',
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
