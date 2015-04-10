'use strict';

var url, runs, runner, reporter, options = {};

var prepareMetrics = function (metrics) {
  return {
    "timeToFirstByte": metrics.timeToFirstByte,
    "domInteractive": metrics.domInteractive,
    "domComplete": metrics.domComplete
  };
};

var handleResults = function (results) {
  reporter
    .push(Date.now(), prepareMetrics(results.getMetrics()))
    .then(proceed.bind(this));
};

var handleError = function (error) {
  console.error(error);
  runs++;
  proceed();
};

var proceed = function () {
  if (runs > 1) {
    runs--;
    this.run();
  }
};

module.exports.init = function (params) {
  url = /^http/.test(params.url) ?  params.url : "http://" + params.url;
  runs = params.runs;
  runner = params.runner;
  reporter = params.reporter;
  options.timeout = params.timeout;
  options.modules = "windowPerformance";

  reporter.init(params.reporterOptions);

  return this;
};

module.exports.run = function () {
  runner
    .run(url, options)
    .then(handleResults.bind(this), handleError.bind(this));
};
