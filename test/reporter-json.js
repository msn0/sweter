'use strict';

var assert = require('assert');
var reporter = require('../lib/reporter/json');

describe('JSON reporter', function () {

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

    assert.equal('{"A":"foo","B":"bar"}\n', this.out);
  });
});
