'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('MainCtrl', function ($scope, $window, $state, flash) {
    $scope.user = angular.fromJson($window.sessionStorage.user);
    $scope.signout = function() {
      delete $window.sessionStorage.user;
      flash.success = 'Signed out';
      $state.go('cover');
    };
  });
