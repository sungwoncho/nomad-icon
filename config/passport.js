var User = require('../models/user.js');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (passport) {
  passport.use(new TwitterStrategy({
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
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
