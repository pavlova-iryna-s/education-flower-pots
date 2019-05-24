'use strict';

angular.module('myApp.plants', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/plants', {
      templateUrl: 'plants/plants.html',
      controller: 'PlantsCtrl',
      _navigation: 'plants'
    });
  }])
  .controller('PlantsCtrl', function() {});
