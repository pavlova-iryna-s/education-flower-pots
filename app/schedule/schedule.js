'use strict';

angular.module('myApp.schedule', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/schedule', {
      templateUrl: 'schedule/schedule.html',
      controller: 'ScheduleCtrl',
      _navigation: 'schedule'
    });
  }])
  .controller('ScheduleCtrl', function() {});
