'use strict';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

angular.module('myApp.date.nextSchedule-filter', [])
  .filter('nextSchedule', function() {
    /**
     * @param {Number} lastWateredDate
     * @param {Number} [days=1]
     * @return {Number}
     */
    return function(lastWateredDate, days = 1) {
      const now = new Date();

      lastWateredDate = (new Date(lastWateredDate) || now);

      if (now <= lastWateredDate) {
        return 0;
      }

      const nextSchedule = new Date(lastWateredDate.getTime() + (days * MS_PER_DAY));

      return Math.round((nextSchedule.getTime() - lastWateredDate.getTime()) / MS_PER_DAY);
    };
  });
