'use strict';

/**
 * @ngdoc service
 * @name wgafApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the wgafApp.
 */
angular.module('wgafApp')
  .factory('authInterceptor', function ($window, $log, $q, $location) {

    return {
      request: function(config) {
        config.headers = config.headers || {};
        var user = angular.fromJson($window.sessionStorage.user);
        if ($window.sessionStorage.user) {
          config.headers.Authorization = 'Bearer ' + user.token;
        }
        return config;
      },
      response: function(response) {
        if (response.status === 401) {
          $log.warn('Not authenticated: ', response);
          $location.path('/signin');
        }
        return response || $q.when(response);
      }
    };
  });
