'use strict';

describe('Service: db', function () {

  // load the service's module
  beforeEach(module('wgafApp'));

  // instantiate service
  var db;
  beforeEach(inject(function (_db_) {
    db = _db_;
  }));

  it('should do something', function () {
    expect(!!db).toBe(true);
  });

});
