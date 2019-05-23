'use strict';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

angular.module('myApp.date.filters', [])
  .filter('daysDifference', function() {
    /**
     * @param {Number} lastWateredDate
     * @param {Number} [days=0]
     * @return {Number}
     */
    return function(lastWateredDate, days = 0) {
      const now = new Date();

      now.setHours(0, 0, 0, 0);

      lastWateredDate = (new Date(lastWateredDate) || now);
      lastWateredDate.setHours(0, 0, 0, 0);

      if (now < lastWateredDate) {
        return 0;
      }

      const schedule = new Date(lastWateredDate.getTime() + (days * MS_PER_DAY));

      return Math.round((schedule.getTime() - now.getTime()) / MS_PER_DAY);
    };
  }).filter('nextSchedule', function() {
    /**
     * @param {Number} [days=0]
     * @return {Number}
     */
    return function(days = 0) {
      return (days > 0 ? days : 0);
    };
  });
