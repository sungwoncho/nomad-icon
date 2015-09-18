var status = require('./status');
var user = require('./user');
var moment = require('moment');

module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.render('index');
  });
  app.use('/', status);
  app.use('/u', user);
  app.get('/settings', function (req, res) {
    res.render('settings', {
      iconHash: req.user.iconHash,
      currentCity: req.user.location.city,
      movedOn: moment(req.user.location.movedOn).format('YYYY-MM-DD')
    });
  });

  // Twitter OAuth
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/settings',
      failureRedirect: '/failed'
    }),
    function (req, res) {
      res.redirect('/');
    });
};
