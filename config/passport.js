var User = require('../models/user.js');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (passport) {
  passport.use(new TwitterStrategy({
      consumerKey: process.env.NMDICO_CONSUMER_KEY,
      consumerSecret: process.env.NMDICO_CONSUMER_SECRET,
      callbackURL: process.env.NMDICO_URL + '/auth/twitter/callback'
    },
    function (token, tokenSecret, profile, done) {
      User.findOne({'twitter.id': profile.id}, function (err, user) {
        if (user) {
          return done(err, user);
        } else {
          var newUser = {
            iconHash: require('crypto').randomBytes(8).toString('hex'),
            twitter: {
              id: profile.id,
              username: profile.username,
              tokenSecret: tokenSecret
            },
            location: {
              city: 'Earth'
            }
          };
          User.create(newUser, function (err, user) {
            return done(err, user);
          });
        }
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
