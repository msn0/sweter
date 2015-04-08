'use strict';

var assert = require('assert');
var sinon = require('sinon');
var rewire = require("rewire");
var reporter = rewire('../lib/reporter/elastic');

describe('Elasticsearch reporter', function () {

  beforeEach(function () {
    this.client = {
      create: function () {}
    };
    this.elasticsearch = {
      Client: function () {}
    };

    this.reporter = reporter;
    this.reporter.init({
      host: "host",
      index: "index"
    });

    this.reporter.__set__("elasticsearch", this.elasticsearch);
    this.reporter.__set__("client", this.client);
    this.clientSpy = sinon.spy(this.elasticsearch, 'Client');
    this.createSpy = sinon.spy(this.client, 'create');

  });

  afterEach(function () {
    this.reporter = {};
  });

  it('init should create client with given host', function () {
    this.reporter.init({
      host: "host",
      index: "index"
    });
    assert(this.clientSpy.calledWith({
      host: "host:9200"
    }));
  });

  it('should abort when host is missing', function () {
    var exitStub = sinon.stub(process, 'exit');

    this.reporter.init({
      index: "index"
    });

    assert(exitStub.called);
    exitStub.restore();
  });

  it('should abort when index is missing', function () {
    var exitStub = sinon.stub(process, 'exit');

    this.reporter.init({
      host: "host"
    });

    assert(exitStub.called);
    exitStub.restore();
  });

  it('push should call client.create with expected params', function () {
    var metrics = {
      A: "foo",
      B: "bar"
    };

    this.reporter.push(123, metrics);

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

