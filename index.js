'use strict';

var url, runs, timeout, runner, appender, options = {};

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

  return this;
};

module.exports.run = function () {
  runner
    .run(url, options)
    .then(handleResults.bind(this), handleError.bind(this));
};
