'use strict';

var assert = require('assert');
var sinon = require('sinon');
var rewire = require("rewire");
var sweter = rewire('../');

describe('Sweter', function () {

  beforeEach(function () {
    this.runner = {
      run: function () {
        return Promise.resolve();
      }
    };
    this.reporter = {
      init: function () {}
    };
    this.sweter = sweter;
    this.sweter.__set__("runner", this.runner);
  });

  it('runner should be called with provided url', function () {
    var spy = sinon.spy(this.runner, "run");
    sweter
      .init({
        url: "url",
        runs: 1,
        reporter: this.reporter,
        reporterOptions: {},
        timeout: 11
      })
      .run();

    assert(spy.calledWith("http://url", {
      timeout: 11,
      modules: "windowPerformance"
    }));
  });

  it('reporter should be initialized with reporterOptions', function () {
    var spy = sinon.spy(this.reporter, "init");
    sweter.init({
      reporter: this.reporter,
      reporterOptions: {
        foo: "bar"
      }
    });

    assert(spy.calledWith({
      foo: "bar"
    }));
  });

  it('custom reporter should be initialized if provided', function () {
    var spy = sinon.spy(this.reporter, "init");
    sweter.init({
      reporter: this.reporter,
      reporterOptions: {
        foo: "bar"
      }
    });

    assert(spy.calledWith({
      foo: "bar"
    }));
  });

});
