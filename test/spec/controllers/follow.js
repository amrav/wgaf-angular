'use strict';

describe('Controller: FollowCtrl', function () {

  // load the controller's module
  beforeEach(module('wgafApp'));

  var FollowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FollowCtrl = $controller('FollowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
