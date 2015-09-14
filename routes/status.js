var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');
var ejs = require('ejs');
var setParams = require('../lib/setParams');

router.get('/:username/status', function (req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) throw err;

    if (user) {
      res.setHeader('Content-Type', 'image/svg+xml');

      var params = setParams(user);
      ejs.renderFile(path.join(__dirname, '../views/status.svg'), params, function (err, rendered) {
        if (err) throw err;

        res.end(rendered);
      });
    }
  });
});

module.exports = router;
