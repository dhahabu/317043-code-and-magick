'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 140;

var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var getColor = function (name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }

  return 'rgba(0, 77, 255, ' + getRandomNumber(0.1, 1) + ')';
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderCloud = function (ctx) {
  renderBar(ctx, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderBar(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var coordinateX = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
    var topGap = MAX_BAR_HEIGHT - barHeight;

    renderText(ctx, Math.round(times[i]), coordinateX, GAP * 4 + topGap, '#000000');
    renderText(ctx, names[i], coordinateX, MAX_BAR_HEIGHT + GAP * 5.5, '#000000');

    renderBar(ctx, coordinateX, GAP * 5 + topGap, BAR_WIDTH, barHeight, getColor(names[i]));
  }
};
