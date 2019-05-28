'use strict';

describe('module - myApp.plants', function() {

  beforeEach(module('myApp.plants'));

  describe('controller - PlantsCtrl', function(){
    it('should be created', inject(function($controller) {
      const ctrl = $controller('PlantsCtrl');

      expect(ctrl).toBeDefined();
    }));
  });
});
