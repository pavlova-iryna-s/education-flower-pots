'use strict';

angular.module('myApp.string.filters', [])
  .filter('plural', function() {
    /**
     * @param {Number} [count=1]
     * @return {String}
     */
    return function(count = 1) {
      return (count === 1 ? '' : 's');
    };
  });
