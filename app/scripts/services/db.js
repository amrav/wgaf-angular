'use strict';

/**
 * @ngdoc service
 * @name wgafApp.db
 * @description
 * # db
 * Service in the wgafApp.
 */
angular.module('wgafApp')
  .service('db', function () {
    this.links = {};
    this.profiles = {};
  });
