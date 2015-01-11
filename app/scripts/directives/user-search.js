'use strict';

/**
 * @ngdoc directive
 * @name wgafApp.directive:userSearchInput
 * @description
 * # userSearchInput
 */
angular.module('wgafApp')
  .directive('userSearch', function (API) {
    return {
      restrict: 'E',
      scope: {
        model: '=',
        valid: '=',
        placeholder: '@?'
      },
      templateUrl: 'views/user-search.html',
      controller: function postLink($scope) {

        $scope.valid = false;
        $scope.placeholder = $scope.placeholder || 'Username';

        var responsesCache = [];

        var engine = new Bloodhound({
          name: 'users',
          remote: {
            url: API + '/users?search=%QUERY',
            filter: function(response) {
              $scope.$apply(function() {
                responsesCache = _.union(responsesCache, _.map(response, 'username'));
              });
              return response;
            }
          },
          datumTokenizer: function(datum) {
            return Bloodhound.tokenizers.whitespace(datum.username);
          },
          queryTokenizer: Bloodhound.tokenizers.whitespace
        });

        engine.initialize();

        $scope.userData = {
          name: 'usernames',
          displayKey: 'username',
          source: engine.ttAdapter()
        };

        $scope.$watch(function(scope) {
          return {
            cache: responsesCache,
            model: scope.model
          };
        }, function() {
          $scope.valid = _.contains(responsesCache, $scope.model);
        }, true);

      }
    };
  });
