'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('ProfileCtrl', function ($scope, $http, $stateParams, $log, flash, API) {

    $scope.profile = {
      loading: true
    };

    $http
      .get(API + '/users/' + $stateParams.username)
      .success(function(data) {
        $scope.profile = data;
        $scope.profile.followers = data.followers.sort();
        $scope.profile.following = data.following.sort();
        $log.info('profile: ', $scope.profile);
      })
      .error(function(data) {
        $log.error(data);
        flash.error = 'Something went wrong...';
      });
  });
