var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:username/status', function (req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(path.join(__dirname, '../views/status.svg'));
});

module.exports = router;
