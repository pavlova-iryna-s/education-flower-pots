'use strict';

describe('myApp.plants module', function() {

  beforeEach(module('myApp.plants'));

  describe('plants controller', function(){
    it('should ....', inject(function($controller) {
      //spec body
      const ctrl = $controller('PlantsCtrl');

      expect(ctrl).toBeDefined();
    }));
  });
});
