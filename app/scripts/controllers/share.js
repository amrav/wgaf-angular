'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:ShareCtrl
 * @description
 * # ShareCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('ShareCtrl', function ($scope, $window, $http, API, flash, $log) {

    $scope.share = {
      url: null,
      summary: '',
      reset: function() {
        this.url = null;
        this.summary = null;
      }
    };

    $scope.sharing = false;

    $scope.shareLink = function(shareForm) {
      $scope.sharing = true;
      $http
        .post(API + '/users/' + $scope.user.username + '/links', $scope.share)
        .success(function() {
          flash.success = 'Link added';
          $scope.share.reset();
          shareForm.$setPristine();
        })
        .error(function(data) {
          flash.error = 'Something went wrong...';
          $log.error(data);
        })
        .finally(function() {
          $scope.sharing = false;
        });
    };

  });
