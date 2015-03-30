'use strict';

var assert = require('assert');
var sinon = require('sinon');
var Sweter = require('../');

describe('Sweter', function () {

  beforeEach(function () {
    this.runner = {
      run: function () {}
    };
    this.appender = function () {};
  });

  it('runner should be called with provided url', function () {
    var stub = sinon.spy(this.runner, "run");
    var sweter = new Sweter({
      url: "url",
      runs: 1,
      runner: this.runner,
      appender: this.appender
    });

    sweter.run();

    assert(stub.calledWith("url"));
  });

});
