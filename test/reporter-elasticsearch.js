'use strict';

var assert = require('assert');
var sinon = require('sinon');
var rewire = require("rewire");
var reporter = rewire('../lib/reporter/elasticsearch');

describe('Elasticsearch reporter', function () {

  beforeEach(function () {
    this.client = {
      create: function () {}
    };
    this.elasticsearch = {
      Client: function () {}
    };
    reporter.__set__("elasticsearch", this.elasticsearch);
    reporter.__set__("client", this.client);
    this.clientSpy = sinon.spy(this.elasticsearch, 'Client');
    this.createSpy = sinon.spy(this.client, 'create');
  });

  it('init should create client with given host', function () {
    reporter.init({
      host: "host",
      index: "index"
    });

    assert(this.clientSpy.calledWith({
      host: "host:9200"
    }));
  });

  it('push should call client.create with expected params', function () {
    var metrics = {
      A: "foo",
      B: "bar"
    };

    reporter.push(123, metrics);

    assert(this.createSpy.calledWith({
      index: "index",
      type: 'object',
      body: {
        timestamp: 123,
        metrics: metrics
      }
    }));
  });

});

