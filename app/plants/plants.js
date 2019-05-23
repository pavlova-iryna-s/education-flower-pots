'use strict';

const plantsModule = angular.module('myApp.plants', ['ngRoute']);

plantsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plants', {
    templateUrl: 'plants/plants.html',
    controller: 'PlantsCtrl'
  });
}]);

plantsModule.controller('PlantsCtrl', ['$scope', function($scope) {
  $scope.$parent.currentNavItem = 'plants';
}]);
