'use strict';

describe('module- myApp.schedule', function() {

  beforeEach(module('myApp.schedule'));

  describe('controller - ScheduleCtrl', function(){
    it('should be created', inject(function($controller) {
      const ctrl = $controller('ScheduleCtrl');

      expect(ctrl).toBeDefined();
    }));
  });
});
