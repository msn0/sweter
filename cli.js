#!/usr/bin/env node
'use strict';
const meow = require('meow');
const sweter = require('./');
let flag, reporter;

const cli = meow({
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
    '  --reporter   console (default), elastic, stats or json',
    '  --schedule   schedule in cron format "* * * * * *"',
    '  --daemonize  daemonize a process',
    '',
    'Elastic options',
    '  --elastic-host    elastic host',
    '  --elastic-index   elastic index'
  ].join('\n')
});

if (!cli.input[0]) {
  console.error('Please supply an URL');
  process.exit(1);
}

const params = {
  url: cli.input[0],
  runs: cli.flags.runs,
  timeout: cli.flags.timeout,
  reporter: cli.flags.reporter,
  customReporter: cli.flags.customReporter,
  schedule: cli.flags.schedule,
  daemonize: cli.flags.daemonize,
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

sweter.init(params);

if (!params.schedule) {
  sweter.run();
}
