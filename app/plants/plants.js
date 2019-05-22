'use strict';

const plantsModule = angular.module('myApp.plants', ['ngRoute']);

plantsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plants', {
    templateUrl: 'plants/plants.html',
    controller: 'PlantsCtrl'
  });
}]);

plantsModule.controller('PlantsCtrl', ['$scope', '$localStorage', function($scope, $localStorage) {
  const plants = $localStorage.getObject('plants');

  if (plants) {
    $scope.plants = plants;
  } else {
    // TODO: Remove mock data.
    $scope.plants = $localStorage.setObject('plants', [{
      id: 1,
      name: 'Mr. Tomato',
      schedule: 4,
      lastWatered: new Date(2019, 5, 20)
    }, {
      id: 2,
      name: 'Lovely Rose',
      schedule: 2,
      lastWatered: Date.now()
    }, {
      id: 3,
      name: 'Spiky Cactus',
      schedule: 7,
      lastWatered: Date.now()
    }, {
      id: 4,
      name: 'Aloe',
      schedule: 5,
      lastWatered: Date.now()
    }]);
  }
}]);
