'use strict';

var phantomas = require('phantomas');
var appender = require('./lib/appenders/sweter-console-appender');

module.exports.process = function (url) {
  phantomas(url, function(err, json, results) {
    appender.push(new Date().getTime(), json.metrics.domInteractive);
  });
};