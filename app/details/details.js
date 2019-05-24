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
    const plantIndex = $routeParams.plantIndex;

    $scope.plant = $plantsFactory.getPlant(plantIndex);

    function calculateDays() {
      $scope.lastWateredInDays = $plantsFactory.getLastWateredInDays(plantIndex);
      $scope.nextScheduleInDays = $plantsFactory.getNextScheduleInDays(plantIndex);
    };

    $scope.waterPlant = function() {
      $plantsFactory.water(plantIndex);

      calculateDays();
    };

    $scope.removePlant = function() {
      $plantsFactory.remove(plantIndex);
    };

    calculateDays();
  });
