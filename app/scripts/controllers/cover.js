'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:CoverCtrl
 * @description
 * # CoverCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('CoverCtrl', function ($scope, $http, API, $window, $log, $state, flash) {

    if ($window.sessionStorage.user) {
      $state.go('main.dashboard');
    }

    $scope.user = {};

    $scope.signingIn = false;
    $scope.signingUp = false;

    $scope.signInText = function() {
      if ($scope.signingIn) {
        return 'Signing in...';
      } else {
        return 'Sign in';
      }
    };
    $scope.signUpText = function() {
      if ($scope.signingUp) {
        return 'Signing up...';
      } else {
        return 'Sign up';
      }
    };

    $scope.signIn = function() {
      delete $scope.signInError;
      $scope.signingIn = true;
      $http
        .post(API + '/auth', $scope.user)
        .success(function(data) {
          $window.sessionStorage.user = angular.toJson({
            username: $scope.user.username,
            token: data.token
          });
          $state.go('main.dashboard');
        })
        .error(function(data) {
          delete $window.sessionStorage.token;
          $scope.signingIn = false;
          if (data.message === 'email not verified') {
            $scope.signInError = $scope.user.username + ', please verify your email before signing in.';
          } else if (data.message === 'bad auth') {
            $scope.signInError = 'Invalid username or password.';
          } else {
            flash.error = 'Something went wrong...';
          }
        });
    };

    $scope.signUp = function() {
      delete $scope.signUpError;
      $scope.signingUp = true;
      $http
        .post(API + '/users', $scope.user)
        .success(function(data) {
          $log.info('signed up: ', data);
          $scope.signingUp = false;
          flash.success = 'Account created';
          $state.go('cover.sign-up.verify');
        })
        .error(function(data) {
          if (data.message === 'username already exists') {
            $scope.signUpError = 'Username is taken. Please pick another username.';
          }
          $scope.signingUp = false;
        });
    };
  });
