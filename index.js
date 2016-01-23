'use strict';

let runner = require('./lib/runner/phantomas');
const CronJob = require('cron').CronJob;
const daemonize = require('daemon');

let url, runs, reporter, job, options = {};

function prepareMetrics(metrics) {
  return {
    "timeToFirstByte": metrics.timeToFirstByte,
    "domInteractive": metrics.domInteractive,
    "domComplete": metrics.domComplete
  };
}

function handleResults(results) {
  reporter
    .push(Date.now(), prepareMetrics(results.getMetrics()))
    .then(proceed.bind(this));
}

function handleError(error) {
  console.error(error);
  runs++;
  proceed();
}

function proceed() {
  runs--;
  if (runs > 0) {
    this.run();
  }
  if (runs === 0) {
    reporter.finalize();
  }
}

function spawnReporter(params) {
  var reporterName = params.reporter || "console";
  try {
    reporter = require('sweter-' + reporterName + '-reporter');
  } catch (e) {
    reporter = require(reporterName);
  }
  reporter.init(params.reporterOptions);
}

function runScheduledJob(originalRuns) {
  runs = originalRuns;
  this.run();
}

module.exports.init = function (params) {
  url = /^http/.test(params.url) ?  params.url : "http://" + params.url;
  runs = params.runs || 1;
  options.timeout = params.timeout || 30;
  options.modules = params.modules;

  spawnReporter(params);

  if (params.schedule) {
    job = new CronJob(params.schedule, runScheduledJob.bind(this, runs), null, true);
  }
  if (params.daemonize) {
    daemonize();
  }

  return this;
};

module.exports.run = function () {
  runner
    .run(url, options)
    .then(handleResults.bind(this), handleError.bind(this));
};
