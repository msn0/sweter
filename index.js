'use strict';

var url, runs, runner, appender, options = {};

var prepareMetrics = function (metrics) {
  return {
    "timeToFirstByte": metrics.timeToFirstByte,
    "domInteractive": metrics.domInteractive,
    "domComplete": metrics.domComplete
  };
};

var handleResults = function (results) {
  appender
    .push(Date.now(), prepareMetrics(results.getMetrics()))
    .then(proceed.bind(this));
};

var handleError = function (error) {
  console.error(error);
};

var proceed = function () {
  if (runs > 1) {
    runs--;
    this.run();
  }
};

module.exports.init = function (params) {
  url = params.url;
  runs = params.runs;
  runner = params.runner;
  appender = params.appender;
  options.timeout = params.timeout;
  options.modules = "windowPerformance";

  return this;
};

module.exports.run = function () {
  runner
    .run(url, options)
    .then(handleResults.bind(this), handleError.bind(this));
};
