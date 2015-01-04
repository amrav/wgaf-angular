'use strict';

describe('Directive: links', function () {

  // load the directive's module
  beforeEach(module('wgafApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<links></links>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the links directive');
  }));
});
