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
  if (!options.hasOwnProperty('host') || !options.hasOwnProperty('index')) {
    console.error('Elastic reporter: host and index params are required');
    process.exit(1);
  }
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
