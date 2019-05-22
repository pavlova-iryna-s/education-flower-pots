'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.details',
  'myApp.plants',
  'myApp.schedule',
  'myApp.date.nextSchedule-filter'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/plants'});
}]);

app.controller('AppCtrl', ['$scope', function($scope) {
  $scope.currentNavItem = 'plants';
}]);

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
