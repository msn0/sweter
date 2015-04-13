#!/usr/bin/env node
'use strict';
var meow = require('meow');
var sweter = require('./');
var flag, reporter;

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
    '  --reporter   console (default), elastic or json',
    '',
    'Elasticsearch options',
    '  --elastic-host    elasticsearch host',
    '  --elastic-index   elasticsearch index',
    '',
    'Custom reporters',
    '  --custom-reporter  a node module to be used as reporter'
  ].join('\n')
});

if (!cli.input[0]) {
  console.error('Please supply an URL');
  process.exit(1);
}

var params = {
  url: cli.input[0],
  runs: cli.flags.runs,
  timeout: cli.flags.timeout,
  reporter: cli.flags.reporter,
  customReporter: cli.flags.customReporter,
  reporterOptions: {}
};

if (cli.flags.reporter || cli.flags.customReporter) {
  reporter = cli.flags.reporter || cli.flags.customReporter;
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
