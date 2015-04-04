#!/usr/bin/env node
'use strict';
var meow = require('meow');
var sweter = require('./');
var reporter = require('./lib/reporter/console');
var runner = require('./lib/runner/phantomas');

var cli = meow({
  help: [
    'Usage',
    '  sweter <url> [options]',
    '',
    'Example',
    '  sweter http://allegro.pl',
    '',
    'Options',
    '  --runs     Number of tests to be performed',
    '  --timeout  Timeout for single test run, defaults to 30s'
  ].join('\n')
});

if (!cli.input[0]) {
  console.error('Please supply an URL');
  process.exit(1);
}

sweter
  .init({
    url: cli.input[0],
    runs: cli.flags.runs || 1,
    timeout: cli.flags.timeout || 30,
    reporter: reporter,
    runner: runner
  })
  .run();
