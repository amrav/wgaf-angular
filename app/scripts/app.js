'use strict';

/**
 * @ngdoc overview
 * @name wgafApp
 * @description
 * # wgafApp
 *
 * Main module of the application.
 */
angular
  .module('wgafApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('cover', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'CoverCtrl'
        }).state('cover.sign-in', {
            url: 'signin',
            templateUrl: 'views/sign-in.html'
        }).state('cover.sign-up', {
            url: 'signup',
            templateUrl: 'views/sign-up.html'
        });
        $urlRouterProvider.otherwise('/');
  });
