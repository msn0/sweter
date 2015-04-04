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
    this.reporter = function () {};
  });

  it('runner should be called with provided url', function () {
    var spy = sinon.spy(this.runner, "run");
    sweter
      .init({
        url: "url",
        runs: 1,
        runner: this.runner,
        reporter: this.reporter
      })
      .run();

    assert(spy.calledWith("url"));
  });

});
