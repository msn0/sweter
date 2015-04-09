#!/usr/bin/env node
'use strict';
var meow = require('meow');
var sweter = require('./');
var reporter = require('./lib/reporter/console');
var runner = require('./lib/runner/phantomas');

var reporter, flag;

var cli = meow({
  help: [
    'Usage',
    '  sweter <url> [options]',
    '',
    'Example',
    '  sweter http://allegro.pl',
    '',
    'Options',
    '  --runs       number of tests to be performed',
    '  --timeout    timeout for single test run, defaults to 30s',
    '  --reporter   console (default) or elastic',
    '',
    'Elasticsearch options',
    '  --elastic-host    elasticsearch host',
    '  --elastic-index   elasticsearch index'
  ].join('\n')
});

if (!cli.input[0]) {
  console.error('Please supply an URL');
  process.exit(1);
}

var params = {
  url: cli.input[0],
  runs: cli.flags.runs || 1,
  timeout: cli.flags.timeout || 30,
  reporter: reporter,
  runner: runner
};

if (cli.flags.reporter || cli.flags.customReporter) {
  reporter = cli.flags.reporter || cli.flags.customReporter;
  params.reporter = cli.flags.reporter ? require('./lib/reporter/' + reporter) : require(reporter);
  params.reporterOptions = {};

  for (var key in cli.flags) {
    if (key.match(reporter + "([A-Z][a-z]+)")) {
      flag = key.match(reporter + "([A-Z][a-z]+)")[1].toLowerCase();
      params.reporterOptions[flag] = cli.flags[key];
    }
  }
}

sweter
  .init(params)
  .run();
