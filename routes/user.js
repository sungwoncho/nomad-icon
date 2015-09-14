var express = require('express');
var router = express.Router();

router.get('/:username', function (req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) throw err;

    if (user) {
      // Redirect to Twitter
      res.redirect(user.twitterUrl);
    }
  });
});
