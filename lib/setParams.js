var Canvas = require('canvas');
var moment = require('moment');

function calcWidth(text, fontSize, fontFamily) {
  var canvas = new Canvas(500, 50)
    , ctx = canvas.getContext('2d');

  ctx.font = fontSize + 'px ' + fontFamily;
  return ctx.measureText(text).width;
}

function getIconColor(user) {
  var moveDate = moment(user.location.movedOn);
  var today = moment();
  var daysElapsed = today.diff(moveDate, 'days');

  if (daysElapsed > 60) {
    // very stable
    return '#77C4D3';
  } else if (daysElapsed > 30) {
    // stable
    return '#F77A52';
  } else {
    // unstable
    return '#EA2E49';
  }
}

function setParams(user) {
  var location = user.location.city;
  var fontSize = 11;
  var fontFamily = 'Open Sans,sans-serif';

  return {
    fontSize: fontSize,
    fontFamily: fontFamily,
    location: location,
    iconColor: getIconColor(user),
    textWidth: calcWidth(location, fontSize, fontFamily),
    textStart: 32,
    margin: 30
  };
}

module.exports = setParams;
