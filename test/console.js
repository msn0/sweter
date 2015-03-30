/* global describe, it, beforeEach, afterEach */
'use strict';

var assert = require('assert');
var appender = require('../lib/appender/console');

describe('Console appender', function () {

  beforeEach(function () {
    this.log = console.log;
    this.out = "";
    console.log = function (message) {
      this.out += message + '\n';
    }.bind(this);
  });

  afterEach(function () {
    console.log = this.log;
  });

  it('should be truthy', function () {
    appender.push(1, {
      "A": "foo",
      "B": "bar"
    });

    console.error(this.out);


    assert.equal("Thu Jan 01 1970 - 1:00:00 AM  A: foo  B: bar", this.out);
  });
});

