'use strict';

describe('Service: linksLoader', function () {

  // load the service's module
  beforeEach(module('wgafApp'));

  // instantiate service
  var linksLoader;
  beforeEach(inject(function (_linksLoader_) {
    linksLoader = _linksLoader_;
  }));

  it('should do something', function () {
    expect(!!linksLoader).toBe(true);
  });

});
