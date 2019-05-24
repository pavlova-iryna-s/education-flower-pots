'use strict';

angular.module('myApp.form', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create', {
      templateUrl: 'form/form.html',
      controller: 'FormCtrl',
      _navigation: 'create'
    });
  }])
  .controller('FormCtrl', function($scope, $plantsFactory) {
    $scope.today = new Date();

    $scope.createPlant = function() {
      $plantsFactory.create($scope.plant);
    };
  });
