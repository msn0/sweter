'use strict';

var phantomas = require('phantomas');

var promiseRun = function (url, resolve, reject) {
  phantomas(url)
    .on("results", resolve)
    .on("error", reject);
};

module.exports.run = function (url) {
  return new Promise(promiseRun.bind(this, url));
};
