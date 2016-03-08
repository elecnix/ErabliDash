exports.Series = function(bucketSize, bucketCount) {
  var self = this;
  var buckets = [];
  self.getAverages = function() {
    return buckets.map(function(bucket) {
      return bucket.sum / bucket.count;
    });
  }
  self.getSums = function() {
    return buckets.map(function(bucket) {
      return bucket.sum;
    });
  }
  self.getCounts = function() {
    return buckets.map(function(bucket) {
      return bucket.count;
    });
  }
  self.getBuckets = function() {
    return buckets;
  }
  self.add = function(timestamp, value) {
    self.fillBuckets();
    var bucket = self.getBucket(timestamp);
    if (bucket != null) {
      bucket.count += 1;
      bucket.sum += value;
    }
  }
  self.getBucket = function(timestamp) {
    var len = buckets.length;
    var last = buckets[buckets.length - 1];
    for (var i = len - 1; i > 0; i--) {
      if (buckets[i].time < timestamp) {
        return last;
      }
      last = buckets[i];
    }
    return null;
  }
  self.fillBuckets = function() {
    var current = Math.floor(new Date().getTime() / 1000 / bucketSize) * bucketSize;
    var start = current - (bucketSize * bucketCount);
    while (buckets.length > 0 && buckets[0].time < start) {
      buckets.shift();
    }
    var last = buckets.length == 0 ? start : buckets[buckets.length - 1].time;
    while (last < current) {
      buckets.push({
        "time": last + bucketSize,
        "count": 0,
        "sum": 0
      });
      last = buckets[buckets.length - 1].time;
    }
  }
  self.fillBuckets();
}
