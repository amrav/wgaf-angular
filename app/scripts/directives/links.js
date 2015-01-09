'use strict';

/**
 * @ngdoc directive
 * @name wgafApp.directive:links
 * @description
 * # links
 */
angular.module('wgafApp')
  .directive('links', function (linksLoader) {
    return {
      templateUrl: 'views/links.html',
      restrict: 'E',
      scope: {
        username: '=',
        limit: '=?'
      },
      link: function postLink(scope) {
        scope.loader = linksLoader.instantiate(scope.username);
        if (angular.isDefined(scope.limit)) {
          scope.loader.limit = scope.limit;
        }
        scope.loader.loadLinks();
      }
    };
  });
