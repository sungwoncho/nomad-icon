var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/:iconHash', function (req, res, next) {
  User.findOne({iconHash: req.params.iconHash}, function (err, user) {
    if (err) throw err;

    if (user) {
      // Redirect to Twitter
      res.redirect(user.twitterUrl);
    }
  });
});

router.put('/:iconHash/update', function (req, res, next) {
  User.findOne({iconHash: req.params.iconHash}, function (err, user) {
    if (err) res.send(err);

    user.location.city = req.body.city;
    user.location.movedOn = req.body.movedOn || new Date();

    user.save(function (err) {
      if (err) res.send(err);

      res.sendStatus(204);
    });
  });
});

var ensureLoggedIn =   function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/not-authenticated');
  }
};

module.exports = router;
