'use strict';

var Sweter = function (params) {

  var url = params.url;
  var runs = params.runs;
  var runner = params.runner;
  var appender = params.appender;

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

  this.run = function () {
    runner.run(url, handleResults.bind(this), handleError.bind(this));
  };

};

module.exports = Sweter;
