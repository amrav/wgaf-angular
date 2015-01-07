'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('MainCtrl', function ($scope, $state, flash, $localStorage) {
    $scope.user = $localStorage.user;
    $scope.signout = function() {
      delete $localStorage.user;
      delete $scope.user;
      flash.success = 'Signed out';
      $state.go('cover');
    };
  });
