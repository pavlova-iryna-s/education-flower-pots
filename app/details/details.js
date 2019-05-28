'use strict';

angular.module('myApp.details', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider, $scope) {
    $routeProvider.when('/plants/:plantIndex', {
      templateUrl: 'details/details.html',
      controller: 'DetailsCtrl',
      _navigation: 'details'
    });
  }])
  .controller('DetailsCtrl', function($scope, $routeParams, $plantsFactory) {
    $scope.plantIndex = Number($routeParams.plantIndex);
    $scope.plant = $plantsFactory.getPlant($scope.plantIndex);
  });
