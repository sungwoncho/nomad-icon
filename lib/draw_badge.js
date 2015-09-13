var Canvas = require('canvas')
  , Image = Canvas.Image
  , path = require('path');

function drawOutline(ctx) {
  ctx.fillStyle = '#E6E6E6';
  ctx.fillRect(10, 10, 280, 85);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(161, 192, 234, 0.8)';
  ctx.strokeRect(10, 10, 280, 85);

  ctx.beginPath();
  ctx.moveTo(10, 35);
  ctx.lineTo(290, 35);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 10);
  ctx.lineTo(200, 35);
  ctx.stroke();
}

function writeName(ctx) {
  ctx.font = '12px avalonN';
  ctx.fillStyle = 'black';
  ctx.fillText('Sung Won Cho', 25, 25);
}

function writeLogo(ctx) {
  ctx.font = '12px unlearned';
  ctx.fillStyle = 'black';
  ctx.fillText('nmdi.co', 210, 25);
}

function writeLocation(ctx) {
  ctx.font = '12px avalonN';
  ctx.fillText('location: Sydney', 25, 50);
}

function writeSince(ctx) {
  ctx.font = '12px avalonN';
  ctx.fillText('since 3 months ago', 25, 65);
}

function writeItinerary(ctx) {
  ctx.font = '12px avalonN';
  ctx.fillText('Sydney -> Melbourne -> Perth', 25, 80);
}

function draw() {
  var canvas = new Canvas(370, 120)
    , ctx = canvas.getContext('2d');

  drawOutline(ctx);
  writeName(ctx);
  writeLogo(ctx);
  writeLocation(ctx);
  writeSince(ctx);
  writeItinerary(ctx);

  return canvas;
}

module.exports = draw;
