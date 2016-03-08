var assert = require("assert");
var Series = require('../series.js').Series;

describe('Series', function() {
  var series = new Series(60000, 60);
  it('should have 60 values when nothing added', function() {
    assert.equal(60, series.getAverages().length);
  });
  series.add(new Date().getTime(), 1234);
  it('should have a value', function() {
    var values = series.getAverages();
    assert.equal(1234, values[values.length - 1]);
    console.log(values);
  });
});
