'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('MainCtrl', function ($scope, $window, $state, $http, API, $log, flash) {
    $scope.user = angular.fromJson($window.sessionStorage.user);
    $scope.share = {};
    $scope.sharing = false;
    $scope.follow = {
      username: null,
      valid: false,
      reset: function() {
        this.username = null;
        this.valid = false;
      }
    };
    $scope.following = false;
    $scope.signout = function() {
      delete $window.sessionStorage.user;
      $state.go('cover');
    };
    $scope.shareLink = function() {
      $scope.sharing = true;
      $http
        .post(API + '/users/' + $scope.user.username + '/links', $scope.share)
        .success(function() {
          flash.success = 'Link added';
          $scope.share = {};
        })
        .error(function() {
          flash.error = 'Something went wrong...';
        })
        .finally(function() {
          $scope.sharing = false;
        });
    };
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
