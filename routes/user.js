var express = require('express');
var router = express.Router();

router.get('/:iconHash', function (req, res, next) {
  User.findOne({iconHash: req.params.iconHash}, function (err, user) {
    if (err) throw err;

    if (user) {
      // Redirect to Twitter
      res.redirect(user.twitterUrl);
    }
  });
});
