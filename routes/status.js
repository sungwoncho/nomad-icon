var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');
var ejs = require('ejs');
var setParams = require('../lib/setParams');
var passport = require('passport');
var ensureLoggedIn = require('../lib/routeHelpers').ensureLoggedIn;

router.get('/:iconHash/status.svg', function (req, res, next) {
  User.findOne({iconHash: req.params.iconHash}, function (err, user) {
    if (err) throw err;

    if (user) {
      res.setHeader('Content-Type', 'image/svg+xml');

      var params = setParams(user);
      ejs.renderFile(path.join(__dirname, '../views/status.svg'), params, function (err, rendered) {
        if (err) throw err;

        res.end(rendered);
      });
    } else {
      res.end('User is not found');
    }
  });
});

router.get('/icon', ensureLoggedIn,
  function (req, res, next) {
    User.findOne({'twitter.username': req.user.twitter.username}, function (err, user) {
      if (err) throw err;

      if (user) {
        var type = req.query.type;
        var twitterUrl = 'https://twitter.com/' + user.twitter.username;
        var imageUrl = process.env.NMDICO_URL + '/' + user.iconHash + '/status.svg';
        var payload;

        if (type === 'html') {
          payload = "<a href=\"" + twitterUrl + "\"> <img src=\"" + imageUrl + "\"></img></a>";
        } else if (type === 'markdown') {
          payload = "[![Nomad Icon](" + imageUrl + ")](" + twitterUrl + ")";
        } else if (type === 'image') {
          payload = imageUrl;
        }

        res.end(payload);
      }
    });
  }
);

module.exports = router;
