'use strict';

var doPush = function (data, resolve) {
  var date = new Date(data.timestamp);
  console.log(date.toDateString() + " - " + date.toLocaleTimeString());
  for(var key in data.metrics) {
    console.log("  " + key + ": " + data.metrics[key]);
  }
  resolve();
};

module.exports.push = function (timestamp, metrics) {
  return new Promise(doPush.bind(this, {
    timestamp: timestamp,
    metrics: metrics
  }));
};
