'use strict';

angular.module('myApp.plants', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plants', {
    templateUrl: 'plants/plants.html',
    controller: 'PlantsCtrl'
  });
}])

.controller('PlantsCtrl', [function() {

}]);