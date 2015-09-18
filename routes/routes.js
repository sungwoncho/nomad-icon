var status = require('./status');
var user = require('./user');

module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.render('index');
  });
  app.use('/', status);
  app.get('/settings', function (req, res) {
    res.render('settings');
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
