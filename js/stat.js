'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 140;

var renderCloud = function (ctx, x, y, colorShadow, colorCloud) {
  ctx.fillStyle = colorShadow;
  ctx.fillRect(x + GAP / 2, y + GAP / 2, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = colorCloud;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(0, 0, 0, 0.7)', '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, (GAP * 4) + (MAX_BAR_HEIGHT - barHeight));
    ctx.fillText(names[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, MAX_BAR_HEIGHT + GAP * 5.5);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 77, 255, ' + getRandomNumber(0.1, 1) + ')';
    }

    ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, (GAP * 5) + (MAX_BAR_HEIGHT - barHeight), BAR_WIDTH, barHeight);
  }
};
