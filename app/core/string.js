'use strict';

angular.module('myApp.filters.string', [])
  .filter('inDays', function() {
    /**
     * @param {Number} [count=1]
     * @return {String}
     */
    return function(count = 1) {
      return Math.abs(count) + ' day' + (count === 1 ? '' : 's');
    };
  });
