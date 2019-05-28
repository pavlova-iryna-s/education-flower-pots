'use strict';

describe('myApp.form module', function() {
  let scope = null;

  beforeEach(module('myApp.form'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();

    // TODO: Replace with proper mock
    scope.plantsFactory = {};
  }));

  describe('FormCtrl', function(){
    it('should be created', inject(function($controller) {
      const ctrl = $controller('FormCtrl', {
        $scope: scope
      });

      expect(ctrl).toBeDefined();
    }));
  });
});
