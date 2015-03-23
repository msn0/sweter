#!/usr/bin/env node
'use strict';
var meow = require('meow');
var Sweter = require('./');
var appender = require('./lib/appender/console');
var phantomas = require('phantomas');

var cli = meow({
  help: [
    'Usage',
    '  sweter <url> [options]',
    '',
    'Example',
    '  sweter http://allegro.pl',
    '',
    'Options',
    '  --runs   Number of test to be performed.'
  ].join('\n')
});

if (!cli.input[0]) {
  console.error('Please supply an URL');
  process.exit(1);
}

var sweter = new Sweter({
  url: cli.input[0],
  runs: cli.flags.runs || 1,
  appender: appender,
  runner: phantomas
});

sweter.run();