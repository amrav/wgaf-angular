'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('ProfileCtrl', function ($scope, $http, $stateParams, $log, flash, API,
                                       db, linksLoader) {

    $scope.profile = db.profiles[$stateParams.username] ||
      {username: $stateParams.username, loading: true};

    if ($stateParams.username !== $scope.user.username) {
      $scope.loader = linksLoader;
      $scope.loader.initialize($stateParams.username);
    }

    var caseInsensitiveSort = function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    };

    $http
      .get(API + '/users/' + $stateParams.username)
      .success(function(data) {
        $scope.profile = data;
        $scope.profile.followers = data.followers.sort(caseInsensitiveSort);
        $scope.profile.following = data.following.sort(caseInsensitiveSort);
        db.profiles[$stateParams.username] = $scope.profile;
      })
      .error(function(data) {
        $log.error(data);
        flash.error = 'Something went wrong...';
      });
  });
