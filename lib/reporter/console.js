'use strict';

var promisePush = function (data, resolve) {
  var date = new Date(data.timestamp);
  console.log(date.toUTCString());
  for (var key in data.metrics) {
    console.log("  " + key + ": " + data.metrics[key]);
  }
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
