# sweter [![Build Status](https://travis-ci.org/msn0/sweter.svg?branch=master)](http://travis-ci.org/msn0/sweter)

Simple web performance reporter with ElasticSearch support.

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
    --reporter   console (default) or elastic

  Elasticsearch options
    --elastic-host    elasticsearch host
    --elastic-index   elasticsearch index
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



