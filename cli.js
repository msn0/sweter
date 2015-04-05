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
    '  --runs       number of tests to be performed',
    '  --timeout    timeout for single test run, defaults to 30s',
    '  --reporter   console (default) or elasticsearch',
    '',
    'Elasticsearch options',
    '  --es-host    elasticsearch host',
    '  --es-index   elasticsearch index'
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

if (cli.flags.reporter === 'elasticsearch') {
  if (!cli.flags.hasOwnProperty('esHost') || !cli.flags.hasOwnProperty('esIndex')) {
    console.error('Please supply --es-host and --es-index params');
    process.exit(1);
  }
  params.reporter = require('./lib/reporter/elasticsearch');
  params.reporterOptions = {
    'host': cli.flags.esHost,
    'index': cli.flags.esIndex
  };
}

sweter
  .init(params)
  .run();
