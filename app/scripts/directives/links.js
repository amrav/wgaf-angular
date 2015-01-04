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
        infinite: '=?'
      },
      link: function postLink(scope) {
        scope.loader = linksLoader;
        scope.loader.initialize(scope.username);
        if (angular.isDefined(scope.infinite) && !scope.infinite) {
          scope.loader.limit = 1;
        }
      }
    };
  });
