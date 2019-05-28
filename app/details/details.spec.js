'use strict';

describe('module - myApp.details', function() {
  let scope = null;

  beforeEach(module('myApp.details'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();

    // TODO: Replace with proper mock
    scope.plantsFactory = {};
  }));

  describe('controller - DetailsCtrl', function(){
    it('should be created', inject(function($controller) {
      const ctrl = $controller('DetailsCtrl', {
        $scope: scope,
        $plantsFactory: {
          getPlant: function() {}
        }
      });

      expect(ctrl).toBeDefined();
    }));
  });
});
