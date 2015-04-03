#!/usr/bin/env node
'use strict';
var meow = require('meow');
var sweter = require('./');
var appender = require('./lib/appender/console');
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
    '  --runs   Number of tests to be performed.'
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
    appender: appender,
    runner: runner
  })
  .run();
