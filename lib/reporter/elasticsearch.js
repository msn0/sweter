'use strict';

var elasticsearch = require('elasticsearch');
var client, index;

var promisePush = function (data, resolve) {
  client.create({
    index: index,
    type: 'object',
    body: {
      timestamp: data.timestamp,
      metrics: data.metrics
    }
  }, resolve);
};

module.exports.init = function (options) {
  index = options.index;
  client = elasticsearch.Client({
    host: options.host + ':9200'
  });
};

module.exports.push = function (timestamp, metrics) {
  return new Promise(promisePush.bind(this, {
    timestamp: timestamp,
    metrics: metrics
  }));
};
