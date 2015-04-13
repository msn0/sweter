'use strict';

var runner = require('./lib/runner/phantomas');

var url, runs, reporter, options = {};

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

var spawnReporter = function (params) {
  var reporterName = params.reporter || params.customReporter || "console";
  try {
    reporter = require('./lib/reporter/' + reporterName);
  } catch (e) {
    reporter = require(reporterName);
  }
  reporter.init(params.reporterOptions);
};

module.exports.init = function (params) {
  url = /^http/.test(params.url) ?  params.url : "http://" + params.url;
  runs = params.runs || 1;
  options.timeout = params.timeout || 30;
  options.modules = "windowPerformance";

  spawnReporter(params);

  return this;
};

module.exports.run = function () {
  runner
    .run(url, options)
    .then(handleResults.bind(this), handleError.bind(this));
};
