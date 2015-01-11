'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('ForgotPasswordCtrl', function ($scope, $log, API, flash, $http) {
    $scope.forgot = {
      email: null,
      valid: false,
      processing: false,
      submit: function() {
        var that = this;
        that.processing = true;
        $http
          .post(API + '/users/forgot-password', {email: that.email})
          .success(function() {
            flash.success = 'Password reset email sent. Please follow the instructions there.';
            that.reset();
          })
          .error(function(data) {
            $log.info(data);
            flash.error = 'Something went wrong...';
          })
          .finally(function() {
            that.processing = false;
          });
      },
      reset: function() {
        this.username = null;
        this.valid = false;
        this.processing = false;
      }
    };
  });
