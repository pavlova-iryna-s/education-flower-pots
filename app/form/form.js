'use strict';

const formModule = angular.module('myApp.form', ['ngRoute']);

formModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'form/form.html',
    controller: 'FormCtrl'
  });
}]);

formModule.controller('FormCtrl', function($scope, $localStorage, $location) {
  $scope.$parent.currentNavItem = 'form';
  $scope.today = new Date();

  $scope.createPlant = function() {
    $scope.$parent.plants.push($scope.plant);

    $localStorage.setObject('plants', $scope.$parent.plants);
    $location.path('plants');
  };
});
