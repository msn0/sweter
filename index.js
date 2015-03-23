'use strict';

var Sweter = function (params) {

  var runner = params.runner;

  this.url = params.url;
  this.runs = params.runs;
  this.appender = params.appender;

  var prepareMetrics = function (metrics) {
    return {
      "timeToFirstByte": metrics.timeToFirstByte,
      "domInteractive": metrics.domInteractive,
      "domComplete": metrics.domComplete
    };
  };

  var handleResults = function (results) {
    this.appender
      .push(new Date().getTime(), prepareMetrics(results.getMetrics()))
      .then(proceed.bind(this));
  };

  var handleError = function (error) {
    console.error(error);
  };

  var proceed = function () {
    if (this.runs > 1) {
      this.run(this.url, {
        runs: --this.runs
      });
    }
  };

  this.run = function () {
    var task = runner(this.url);
    task.on("results", handleResults.bind(this));
    task.on("error", handleError.bind(this));
  };

};

module.exports = Sweter;
