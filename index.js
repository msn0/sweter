'use strict';

var phantomas = require('phantomas');
var appender = require('./lib/appender/console');
var runs = 0;
var url;

var prepareMetrics = function (metrics) {
  return {
    "timeToFirstByte": metrics.timeToFirstByte,
    "domInteractive": metrics.domInteractive,
    "domComplete": metrics.domComplete
  };
};

var handleResults = function (results) {
  appender
    .push(new Date().getTime(), prepareMetrics(results.getMetrics()))
    .then(function () {
      if (runs > 0) {
        process(url, {
          runs: --runs
        });
      }
    });
};

var handleError = function (error) {
  console.error(error);
};

var process = function (uri, flags) {

  url = uri;
  runs = flags.runs || 1;

  var task = phantomas(url);
  task.on("results", handleResults);
  task.on("error", handleError);
};

module.exports.process = process;