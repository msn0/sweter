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
    --runs      Number of tests to be performed
    --timeout   Timeout for single test run, defaults to 30s
```

## Output

```
$ sweter https://google.com

Sat, 04 Apr 2015 10:40:01 GMT
  timeToFirstByte: 139
  domInteractive: 293
  domComplete: 664
```


