'use strict';

var assert = require('assert');
var reporter = require('../lib/reporter/console');

describe('Console reporter', function () {

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
    reporter.push(0, {
      "A": "foo",
      "B": "bar"
    });

    assert.equal("Thu, 01 Jan 1970 00:00:00 GMT\n  A: foo\n  B: bar\n", this.out);
  });
});

