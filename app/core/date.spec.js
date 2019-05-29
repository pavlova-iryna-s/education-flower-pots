'use strict';

describe('module - myApp.filters.date', function() {
  beforeEach(module('myApp.filters.date'));

  describe('filter - futureDaysDifference', function() {
    // We always compare with current date, so it is not possible to have static value here.

    it('should return next schedule difference in days starting from today', inject(function(futureDaysDifferenceFilter) {
      const daysAgo = 5;
      const schedule = 6;
      const pastDate = new Date();

      pastDate.setDate(pastDate.getDate() - daysAgo); // 5 days ago

      expect(futureDaysDifferenceFilter(pastDate, schedule, false)).toEqual(schedule - daysAgo);
    }));

    it('should return 0 difference for future date', inject(function(futureDaysDifferenceFilter) {
      const daysInFuture = 9;
      const schedule = 7;
      const futureDate = new Date();

      futureDate.setDate(futureDate.getDate() + daysInFuture); // in 9 days

      expect(futureDaysDifferenceFilter(futureDate, schedule, true)).toEqual(0);
    }));
  });

  describe('filter - nextScheduleInDays', function() {
    it('should transform negative values into 0', inject(function(nextScheduleInDaysFilter) {
      expect(nextScheduleInDaysFilter(-5)).toEqual(0);
    }));

    it('should leave positive values as is', inject(function(nextScheduleInDaysFilter) {
      expect(nextScheduleInDaysFilter(0)).toEqual(0);
      expect(nextScheduleInDaysFilter(3)).toEqual(3);
    }));
  });

  describe('filter - nextScheduleDate', function() {
    it('should transform time into date', inject(function(nextScheduleDateFilter) {
      const date = new Date(2019, 4, 30, 1, 5, 0, 0);

      expect(nextScheduleDateFilter(date.getTime(), 0)).toEqual(date);
    }));

    it('should not change provided date if 0 days were provided', inject(function(nextScheduleDateFilter) {
      const date = new Date(2019, 4, 30, 1, 5, 0, 0);

      expect(nextScheduleDateFilter(date, 0)).toEqual(date);
    }));

    it('should add days to provided date', inject(function(nextScheduleDateFilter) {
      const pastDate = new Date(2019, 4, 30, 1, 5, 0, 0);
      const nextDate = new Date(2019, 5, 3, 1, 5, 0, 0);

      expect(nextScheduleDateFilter(pastDate, 4)).toEqual(nextDate);
    }));
  });
});
