#!/usr/bin/env node
'use strict';
var meow = require('meow');
var sweter = require('./');

var cli = meow({
  help: [
    'Usage',
    '  sweter <url>',
    '',
    'Example',
    '  sweter todomvc.com'
  ].join('\n')
});

if (!cli.input[0]) {
  console.error('Please supply an URL');
  process.exit(1);
}

sweter.process(cli.input[0]);