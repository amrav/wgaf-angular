'use strict';

describe('Directive: userSearchInput', function () {

  // load the directive's module
  beforeEach(module('wgafApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-search-input></user-search-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userSearchInput directive');
  }));
});
