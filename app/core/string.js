'use strict';

angular.module('myApp.string.filters', [])
  .filter('inDays', function() {
    /**
     * @param {Number} [count=1]
     * @return {String}
     */
    return function(count = 1) {
      return count + ' day' + (count === 1 ? '' : 's');
    };
  });
