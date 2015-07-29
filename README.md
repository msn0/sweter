# Sweter [![Build Status](https://travis-ci.org/msn0/sweter.svg?branch=master)](http://travis-ci.org/msn0/sweter)

Simple web performance reporter with scheduling and ElasticSearch support. Sweter uses `phantomas` under the hood
and reports `timeToFirstByte`, `domInteractive` and `domComplete` timings.

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
    sweter allegro.pl --runs 1067

  Options
    --runs       number of tests to be performed
    --timeout    timeout for single test run, defaults to 30s
    --reporter   console (default), elastic, stats or json
    --schedule   schedule in cron format "* * * * * *"
    --daemonize  daemonize a process

  Elastic options
    --elastic-host    elastic host
    --elastic-index   elastic index

```

## Reporters

### Console reporter

By default Sweter outputs data to console

```
$ sweter google.com

Sat, 04 Apr 2015 10:40:01 GMT
  timeToFirstByte: 139
  domInteractive: 293
  domComplete: 664
```

### Stats reporter

```
$ sweter google.com --reporter stats

{
  "date":"2015-07-29T12:54:20.403Z",
  "timeToFirstByte": { "median":0.25 },
  "domInteractive":  { "median":0.7  },
  "domComplete":     { "median":1.79 }
}
```

### JSON reporter

```
$ sweter google.com --reporter json

{"timeToFirstByte":329,"domInteractive":610,"domComplete":1557}
```

### Elastic reporter

Sweter can feed Elastic instance

```
$ sweter google.com \
    --reporter elastic \
    --elastic-host localhost \
    --elastic-index sweter

$ curl http://localhost:9200/sweter/_search
{
  "_index": "sweter",
  "_type": "object",
  "_id": "AUyLZuLrG92aw_Xb4w3P",
  "_score": 1,
  "_source": {
    "timestamp": 1428267917998,
    "metrics": {
      "timeToFirstByte": 365,
      "domInteractive": 764,
      "domComplete": 3890
    }
  }
}
```

### Custom reporters

You can write your own reporter if you want. See https://github.com/msn0/sweter-custom-reporter as an example and use it this way

```
$ sweter google.com --reporter sweter-custom-reporter
```

So, assuming your node module name is ``foo`` then

```
$ sweter google.com --reporter foo
```

If ``foo`` requires some additional params then pass them this way

```
$ sweter google.com \
    --reporter foo \
    --foo-param1 "my param" \
    --foo-param2 777
```

### Examples

Measure google.com performance every day at 1:00AM and send data to ElasticSearch:

```
$ sweter google.com \
    --runs 1067 \
    --reporter elastic \
    --elastic-host localhost \
    --elastic-index google \
    --schedule "0 0 1 * * *" \
    --daemonize
```

Measure google.com performance every four hours and log median to file:
```
$ sweter google.com \
    --runs 600 \
    --reporter stats \
    --schedule "0 0 */4 * * *" >> report
```

### Debugging

```
$ DEBUG=* sweter google.com
```

## License

Apache-2.0 &copy; [Michał Jezierski](https://pl.linkedin.com/in/jezierskimichal)
