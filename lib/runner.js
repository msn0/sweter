'use strict';

var phantomas = require('phantomas');

module.exports.run = function (url, onSuccess, onError) {
  var task = phantomas(url);
  task.on("results", onSuccess);
  task.on("error", onError);
};
