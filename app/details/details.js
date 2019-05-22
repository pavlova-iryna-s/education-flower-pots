'use strict';

const detailsModule = angular.module('myApp.details', ['ngRoute']);

detailsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plants/:plantId', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}]);

detailsModule.controller('DetailsCtrl', ['$scope', '$routeParams', '$localStorage', function($scope, $routeParams, $localStorage) {
  const plants = $scope.plants = ($localStorage.getObject('plants') || []);

  $scope.plantDetails = plants.find((plant) => parseInt(plant.id) === parseInt($routeParams.plantId)) || {};
}]);
