var Canvas = require('canvas')
  , Image = Canvas.Image
  , path = require('path');

function drawOutline(ctx) {
  var iconWidth = 100;
  var iconHeight = 20;
  var cornerRadius = 10;

  ctx.lineJoin = 'round';
  ctx.lineWidth = cornerRadius;
  ctx.fillStyle = 'orange';
  ctx.strokeRect((cornerRadius/2), (cornerRadius/2), iconWidth-cornerRadius, iconHeight-cornerRadius);
  ctx.fillRect((cornerRadius/2), (cornerRadius/2), iconWidth-cornerRadius, iconHeight-cornerRadius);
}

function writeName(ctx) {
  ctx.font = '12px avalonN';
  ctx.fillStyle = 'black';
  ctx.fillText('Sung Won Cho', 25, 25);
}

function draw() {
  var canvas = new Canvas(370, 500)
    , ctx = canvas.getContext('2d');

  drawOutline(ctx);

  return canvas;
}

module.exports = draw;
