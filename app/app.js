'use strict';

// Declare app level module which depends on views, and core components
const app = angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.details',
  'myApp.form',
  'myApp.plants',
  'myApp.schedule',
  'myApp.date.filters',
  'myApp.string.filters'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/plants'});
}]);

app.controller('AppCtrl', function($scope, $localStorage) {
  const plants = $localStorage.getObject('plants');

  if (plants) {
    $scope.plants = plants;
  } else {
    // TODO: Remove mock data.
    $scope.plants = $localStorage.setObject('plants', [{
      name: 'Lovely Rose',
      schedule: 2,
      lastWatered: new Date(2019, 4, 22).getTime()
    }, {
      name: 'Mr. Tomato',
      schedule: 4,
      lastWatered: new Date(2019, 4, 17).getTime()
    }, {
      name: 'Spiky Cactus',
      schedule: 7,
      lastWatered: new Date().getTime()
    }, {
      name: 'Aloe',
      schedule: 5,
      lastWatered: new Date().getTime()
    }]);
  }

  $scope.currentNavItem = 'plants';
});

app.directive('nextSchedule', function() {
  return {
    template: `<div class="md-subhead" ng-switch on="nextScheduleInDays">
        <div ng-switch-when="0">
            <md-icon style="color: red;" md-svg-src="img/icons/alarm.svg"></md-icon>
            <span>Next water is today!</span>
        </div>
        <div ng-switch-default>
            <md-icon md-svg-src="img/icons/rain.svg"></md-icon>
            <span>Next water in {{ nextScheduleInDays }} day{{ nextScheduleInDays | plural }}</span>
        </div>
    </div>`
  };
});

/**
 * (c) https://solidfoundationwebdev.com/blog/posts/how-to-use-localstorage-in-angularjs
 */
app.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);

      return value;
    },
    getObject: function(key, defaultValue) {
      if ($window.localStorage[key] !== undefined) {
        return JSON.parse($window.localStorage[key]);
      } else {
        return defaultValue;
      }
    },
    remove: function(key){
      $window.localStorage.removeItem(key);
    },
    clear: function(){
      $window.localStorage.clear();
    }
  }
}]);
