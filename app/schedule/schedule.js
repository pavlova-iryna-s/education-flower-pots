'use strict';

const scheduleModule = angular.module('myApp.schedule', ['ngRoute']);

scheduleModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {
    templateUrl: 'schedule/schedule.html',
    controller: 'ScheduleCtrl'
  });
}]);

scheduleModule.controller('ScheduleCtrl', [function() {

}]);
