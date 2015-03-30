'use strict';

var phantomas = require('phantomas');

var promiseRun = function (url, resolve, reject) {
  var task = phantomas(url);
  task.on("results", resolve);
  task.on("error", reject);
};

module.exports.run = function (url) {
  return new Promise(promiseRun.bind(this, url));
};
