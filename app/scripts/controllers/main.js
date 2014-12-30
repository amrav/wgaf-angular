'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('MainCtrl', function ($scope, $window, $state) {
    $scope.user = angular.fromJson($window.sessionStorage.user);
    $scope.signout = function() {
      delete $window.sessionStorage.user;
      $state.go('cover');
    };
  });
