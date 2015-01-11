'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('ChangePasswordCtrl', function ($scope, $log, $stateParams, $http, flash, $state, API) {
    $scope.change = {
      password: null,
      confirmPassword: null,
      processing: false,
      submit: function() {
        this.processing = true;
        var that = this;
        $http
          .post(API + '/users/' + $stateParams.username + '/change-password', {password: that.password, token: $stateParams.token})
          .success(function() {
            flash.success = 'Password changed successfully';
            $state.go('cover.sign-in');
          })
          .error(function(data) {
            $log.error(data);
            flash.error = 'Something went wrong...';
          })
          .finally(function() {
            that.processing = false;
          });
      }
    };
    $scope.username = $stateParams.username;
  });
