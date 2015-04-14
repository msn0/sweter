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
    sweter http://allegro.pl --runs 1067

  Options
    --runs       number of tests to be performed
    --timeout    timeout for single test run, defaults to 30s
    --reporter   console (default), elastic or json
    --schedule   schedule in cron format "* * * * * *"
    --daemonize  daemonize a process

  Elasticsearch options
    --elastic-host    elasticsearch host
    --elastic-index   elasticsearch index

  Custom reporters
    --custom-reporter   a node module to be used as reporter
```

## Output

### Console reporter

By default sweter outputs data to console

```
$ sweter http://google.com

Sat, 04 Apr 2015 10:40:01 GMT
  timeToFirstByte: 139
  domInteractive: 293
  domComplete: 664
```

### ElasticSearch reporter

sweter can feed elasticsearch instance

```
$ sweter http://google.com --reporter elastic --elastic-host localhost --elastic-index sweter
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
$ sweter http://google.com --custom-reporter sweter-custom-reporter
```

So, assuming your node module name is ``foo`` then

```
$ sweter http://google.com --custom-reporter foo
```

If ``foo`` requires some additional params then pass them this way

```
$ sweter http://google.com \
    --custom-reporter foo \
    --foo-param1 "my param" \
    --foo-param2 777
```

### Examples

Measure google.com performance every day at 1:00AM and send data to ElasticSearch:

```
$ sweter google.com \
    --runs 1067 \
    --custom-reporter elastic \
    --elastic-host localhost \
    --elastic-index google \
    --schedule "0 0 1 * * *" \
    --daemonize
```
