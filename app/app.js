'use strict';

// Declare app level module which depends on views, and core components
const app = angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.details',
    'myApp.form',
    'myApp.plants',
    'myApp.schedule',
    'myApp.date.filters',
    'myApp.string.filters'
  ])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/plants'});
  }])
  .run(['$rootScope', '$location', '$plantsFactory', function($rootScope, $location, $plantsFactory) {
    $rootScope.$on('$routeChangeStart', function (angularEvent, next) {
      if (next.$$route) {
        $rootScope.updateNavigation(next.$$route._navigation);
      }
    });

    $rootScope.plantsFactory = $plantsFactory;

    $rootScope.goTo = function(path) {
      $location.path(path);
    };
  }]);

app.controller('AppCtrl', function($scope, $rootScope, $plantsFactory) {
  $scope.plants = $plantsFactory.getPlants();

  /**
   * @param {String} [path='']
   */
  $rootScope.updateNavigation = function(path = '') {
    $scope.currentNavItem = path;
  }
});

app.directive('nextSchedule', function() {
  return {
    template(tElem, tAttrs) {
      const isStatic = (tAttrs.static ? '::' : '');

      return `<div class="md-subhead" ng-switch on="${isStatic}plant.nextScheduleInDays">
          <div ng-switch-when="0">
              <md-icon style="color: red;" md-svg-src="img/icons/alarm.svg"></md-icon>
              <span>Next water is today!</span>
          </div>
          <div ng-switch-default>
              <md-icon md-svg-src="img/icons/rain.svg"></md-icon>
              <span>Next water in {{ ${isStatic}(plant.nextScheduleInDays | inDays) }}</span>
          </div>
      </div>`;
    }
  };
});

app.factory('$plantsFactory', function($localStorage, $filter, $location) {
  let _plants = $localStorage.getObject('plants-storage');

  if (!_plants) {
    // TODO: Remove mock data.
    _plants = $localStorage.setObject('plants-storage', [{
      name: 'Lovely Rose',
      schedule: 2,
      lastWatered: new Date(2019, 4, 22, 0, 0, 0, 0).getTime()
    }, {
      name: 'Mr. Tomato',
      schedule: 4,
      lastWatered: new Date(2019, 4, 17, 0, 0, 0, 0).getTime()
    }, {
      name: 'Spiky Cactus',
      schedule: 7,
      lastWatered: new Date(2019, 4, 20, 0, 0, 0, 0).getTime()
    }, {
      name: 'Aloe',
      schedule: 5,
      lastWatered: (new Date(new Date().setHours(0, 0, 0, 0))).getTime()
    }]);
  }

  return {
    /**
     * @param {Object} plant
     */
    create(plant) {
      _plants.push(plant);

      this._commitChanges('plants');
    },

    /**
     * @param {Number} plantIndex
     */
    remove(plantIndex) {
      if (plantIndex < 0) {
        return;
      }

      _plants.splice(plantIndex, 1);

      this._commitChanges('plants');
    },

    /**
     * @param {Number} plantIndex
     */
    water(plantIndex) {
      const plant = this.getPlant(plantIndex);

      plant.lastWatered = (new Date(new Date().setHours(0, 0, 0, 0))).getTime();

      this._commitChanges();
    },

    /**
     * @param {Number|Object} plant
     * @return {Object}
     */
    getPlant(plant) {
      const plantIndex = Number.isInteger(plant) ? plant : _plants.indexOf(plant);

      return _plants[plantIndex] || {};
    },

    /**
     * @return {Object[]}
     */
    getPlants() {
      this._serialize();

      return _plants;
    },

    /**
     * @param {Number} plantIndex
     * @return {Number}
     */
    getLastWateredInDays(plantIndex) {
      const plant = this.getPlant(plantIndex);

      if (plant) {
        return Math.abs($filter('daysDifference')(plant.lastWatered, 0));
      }
    },

    /**
     * @param {Number} plantIndex
     * @return {Number}
     */
    getNextScheduleInDays(plantIndex) {
      const plant = this.getPlant(plantIndex);

      if (plant) {
        return $filter('nextScheduleInDays')(
          $filter('daysDifference')(plant.lastWatered, plant.schedule)
        );
      }
    },

    /**
     * @param {String} [callbackPath]
     * @private
     */
    _commitChanges(callbackPath) {
      this._serialize();

      $localStorage.setObject('plants-storage', _plants);

      if (callbackPath) {
        $location.path(callbackPath);
      }
    },

    /**
     * @private
     */
    _serialize() {
      _plants.forEach((plant, plantIndex) => {
        plant.nextScheduleInDays = this.getNextScheduleInDays(plantIndex);
        plant.lastWateredInDays = this.getLastWateredInDays(plantIndex);
      });
    }
  }
});

/**
 * (c) https://solidfoundationwebdev.com/blog/posts/how-to-use-localstorage-in-angularjs
 */
app.factory('$localStorage', ['$window', function($window) {
  return {
    set(key, value) {
      $window.localStorage[key] = value;
    },

    get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },

    setObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);

      return value;
    },

    getObject(key, defaultValue) {
      if ($window.localStorage[key] !== undefined) {
        return JSON.parse($window.localStorage[key]);
      } else {
        return defaultValue;
      }
    },

    remove(key) {
      $window.localStorage.removeItem(key);
    },

    clear() {
      $window.localStorage.clear();
    }
  }
}]);
