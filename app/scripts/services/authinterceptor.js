'use strict';

/**
 * @ngdoc service
 * @name wgafApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the wgafApp.
 */
angular.module('wgafApp')
  .factory('authInterceptor', function ($log, $q, $location, $localStorage) {

    return {
      request: function(config) {
        config.headers = config.headers || {};
        var user = $localStorage.user;
        if (user) {
          config.headers.Authorization = 'Bearer ' + user.token;
        }
        return config;
      },
      response: function(response) {
        if (response.status === 401) {
          $log.warn('Not authenticated: ', response);
          $location.path('/sign-in');
        }
        return response || $q.when(response);
      }
    };
  });
