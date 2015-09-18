var express = require('express');
var router = express.Router();
var User = require('../models/user');
var ensureLoggedIn = require('../lib/routeHelpers').ensureLoggedIn;

router.get('/:iconHash', function (req, res, next) {
  User.findOne({iconHash: req.params.iconHash}, function (err, user) {
    if (err) throw err;

    if (user) {
      // Redirect to Twitter
      res.redirect(user.twitterUrl);
    }
  });
});

router.put('/:iconHash/update', ensureLoggedIn, function (req, res, next) {
  User.findOne({iconHash: req.params.iconHash}, function (err, user) {
    if (err) res.send(err);

    if (user._id.toString() === req.user._id.toString()) {
      user.location.city = req.body.city;
      user.location.movedOn = req.body.movedOn || new Date();

      user.save(function (err) {
        if (err) res.send(err);

        res.sendStatus(204);
      });
    }
  });
});

router.put('/:iconHash/reset', ensureLoggedIn, function (req, res, next) {
  User.findOne({iconHash: req.params.iconHash}, function (err, user) {
    if (err) res.send(err);

    if (user._id.toString() === req.user._id.toString()) {
      user.iconHash = require('crypto').randomBytes(8).toString('hex');

      user.save(function (err) {
        if (err) res.send(err);

        res.sendStatus(204);
      });
    }
  });
});

module.exports = router;
