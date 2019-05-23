'use strict';

const detailsModule = angular.module('myApp.details', ['ngRoute']);

detailsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plants/:plantIndex', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}]);

detailsModule.controller('DetailsCtrl', function($scope, $routeParams, $localStorage, $location, $filter) {
  $scope.$parent.currentNavItem = 'details';
  $scope.plantIndex = $routeParams.plantIndex;
  $scope.plant = $scope.$parent.plants[$scope.plantIndex];

  $scope.waterPlant = function() {
    $scope.plant.lastWatered = (new Date(new Date().setHours(0, 0, 0, 0))).getTime();

    $localStorage.setObject('plants', $scope.$parent.plants);
  };

  $scope.removePlant = function() {
    $scope.$parent.plants.splice($scope.plantIndex, 1);

    $localStorage.setObject('plants', $scope.$parent.plants);
    $location.path('plants');
  };

  $scope.$watch('plant.lastWatered', function() {
    const plant = $scope.plant;

    $scope.lastWateredInDays = Math.abs($filter('daysDifference')(plant.lastWatered, 0));

    $scope.nextScheduleInDays = $filter('nextSchedule')(
      $filter('daysDifference')(plant.lastWatered, plant.schedule)
    );
  })
});
