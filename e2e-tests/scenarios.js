'use strict';

/*
https://github.com/angular/protractor/blob/master/docs/toc.md

AngularJS E2E Testing Guide:
https://docs.angularjs.org/guide/e2e-testing
*/

describe('my app', function() {

  it('should automatically redirect to /plants when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/plants");
  });


  describe('view', function() {
    beforeEach(function() {
      browser.get('index.html#!/plants');
    });

    it('should render "plants" when user navigates to /plants', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for plants view/);
    });
  });


  describe('schedule', function() {
    beforeEach(function() {
      browser.get('index.html#!/schedule');
    });


    it('should render "schedule" when user navigates to /schedule', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for schedule view/);
    });
  });
});
