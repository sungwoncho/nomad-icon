var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./models/db');
var generateSeed = require('./seeds.js');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var User = require('./models/user.js');
var routes = require('./routes/index');
var status = require('./routes/status');
var user = require('./routes/user');
var settings = require('./routes/settings');

var app = express();

generateSeed();

passport.use(new Strategy({
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
    console.log(user);
    done(err, user);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('icaruslives'));
app.use(session({
  secret: 'icaruslives',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/', status);
app.use('/settings', settings);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/settings',
    failureRedirect: '/failed'
  }),
  function (req, res) {
    res.redirect('/');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
