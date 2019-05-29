'use strict';

describe('module - myApp.filters.string', function() {
  beforeEach(module('myApp.filters.string'));

  describe('filter - inDays', function() {
    it('should transform 1 into "1 day"', inject(function(inDaysFilter) {
      expect(inDaysFilter(1)).toEqual('1 day');
    }));

    it('should transform all numbers except 1 into "N days"', inject(function(inDaysFilter) {
      expect(inDaysFilter(0)).toEqual('0 days');
      expect(inDaysFilter(2)).toEqual('2 days');
      expect(inDaysFilter(3)).toEqual('3 days');
    }));

    it('should transform negative values into positive', inject(function(inDaysFilter) {
      expect(inDaysFilter(-2)).toEqual('2 days');
      expect(inDaysFilter(-3)).toEqual('3 days');
    }));
  });
});
