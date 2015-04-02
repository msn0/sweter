'use strict';

var assert = require('assert');
var sinon = require('sinon');
var sweter = require('../');

describe('Sweter', function () {

  beforeEach(function () {
    this.runner = {
      run: function () {
        return Promise.resolve();
      }
    };
    this.appender = function () {};
  });

  it('runner should be called with provided url', function () {
    var spy = sinon.spy(this.runner, "run");
    sweter
      .init({
        url: "url",
        runs: 1,
        runner: this.runner,
        appender: this.appender
      })
      .run();

    assert(spy.calledWith("url"));
  });

});
