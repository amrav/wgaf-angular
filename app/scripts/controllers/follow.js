'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:FollowCtrl
 * @description
 * # FollowCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('FollowCtrl', function ($scope, $http, API, flash, $log) {

    $scope.follow = {
      username: null,
      valid: false,
      reset: function() {
        this.username = null;
        this.valid = false;
      }
    };

    $scope.following = false;

    $scope.followUser = function() {
      $scope.following = true;
      $http
        .post(API + '/users/' + $scope.user.username + '/following',
              {target: $scope.follow.username})
        .success(function() {
          flash.success = 'Following ' + $scope.follow.username;
          $scope.follow.reset();
        })
        .error(function(data) {
          $log.error('Error following user: ', data);
          if (/^already following/.test(data.message)) {
            flash.info = 'Already following ' + $scope.follow.username;
            $scope.follow.reset();
          }
        })
        .finally(function() {
          $scope.following = false;
        });
    };

  });
