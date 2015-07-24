'use strict';

var promisePush = function (data, resolve) {
  console.log(JSON.stringify(data.metrics));
  resolve();
};

module.exports.init = function () {
};

module.exports.finalize = function () {
};

module.exports.push = function (timestamp, metrics) {
  return new Promise(promisePush.bind(this, {
    timestamp: timestamp,
    metrics: metrics
  }));
};
