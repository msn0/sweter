'use strict';

var phantomas = require('phantomas');
var appender = require('./lib/appenders/console');

var getMetrics = function (metrics) {
  return {
    "timeToFirstByte": metrics.timeToFirstByte,
    "domInteractive": metrics.domInteractive,
    "domComplete": metrics.domComplete
  };
};

var handleResults = function (results) {
  appender.push(new Date().getTime(), getMetrics(results.getMetrics()))
    .then(function () {
      console.log("done.");
    });
};

var handleError = function (error) {
  console.error(error);
};

module.exports.process = function (url) {
  var task = phantomas(url);

  task.on("results", handleResults);
  task.on("error", handleError);
};