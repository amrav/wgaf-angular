'use strict';

describe('Controller: CoverCtrl', function () {

  // load the controller's module
  beforeEach(module('wgafApp'));

  var CoverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoverCtrl = $controller('CoverCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
