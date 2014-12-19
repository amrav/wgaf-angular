'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
