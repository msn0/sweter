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
    this.sweter
      .init({
        url: "url"
      })
      .run();
    assert(spy.calledWith("http://url"));
  });

  it('runner should be called with default options', function () {
    var spy = sinon.spy(this.runner, "run");
    this.sweter
      .init({
        url: "http://url",
        modules: "foo"
      })
      .run();
    assert(spy.calledWith("http://url", {
      modules: "foo",
      timeout: 30
    }));
  });

});
