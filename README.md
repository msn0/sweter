# sweter [![Build Status](https://travis-ci.org/msn0/sweter.svg?branch=master)](http://travis-ci.org/msn0/sweter)

Simple web performance reporter.

## Installation

```
npm install -g sweter
```

## Usage

```
$ sweter --help

  Usage
    sweter <url> [options]

  Example
    sweter http://allegro.pl --runs 1068

  Options
    --runs       number of tests to be performed
    --timeout    timeout for single test run, defaults to 30s
    --reporter   console (default) or elasticsearch

  Elasticsearch options
    --es-host    elasticsearch host
    --es-index   elasticsearch index
```

## Output

```
$ sweter http://google.com

Sat, 04 Apr 2015 10:40:01 GMT
  timeToFirstByte: 139
  domInteractive: 293
  domComplete: 664
```


