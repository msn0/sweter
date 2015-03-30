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

  it('should display formatted result', function () {
    appender.push(0, {
      "A": "foo",
      "B": "bar"
    });

    assert.equal("Thu, 01 Jan 1970 00:00:00 GMT\n  A: foo\n  B: bar\n", this.out);
  });
});

