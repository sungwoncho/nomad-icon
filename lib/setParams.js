var Canvas = require('canvas');

function calcWidth(text, fontSize, fontFamily) {
  var canvas = new Canvas(500, 50)
    , ctx = canvas.getContext('2d');

  ctx.font = fontSize + 'px ' + fontFamily;
  return ctx.measureText(text).width;
}

function setParams(user) {
  var location = user.location;
  var fontSize = 11;
  var fontFamily = 'Open Sans,sans-serif';

  return {
    fontSize: fontSize,
    fontFamily: fontFamily,
    location: location,
    textWidth: calcWidth(location, fontSize),
    textStart: 32,
    margin: 30
  };
}

module.exports = setParams;
