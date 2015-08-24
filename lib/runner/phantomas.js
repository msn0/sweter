'use strict';

var phantomas = require('phantomas');

function promiseRun(url, options, resolve, reject) {
  phantomas(url, options)
    .on("results", resolve)
    .on("error", reject);
}

module.exports.run = function (url, options) {
  return new Promise(promiseRun.bind(this, url, options));
};
