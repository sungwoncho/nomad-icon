var express = require('express');
var router = express.Router();
var draw = require('../lib/draw_badge.js');

router.get('/:id', function (req, res, next) {
  res.setHeader('Content-Type', 'image/png');
  draw().pngStream().pipe(res);
});

module.exports = router;
