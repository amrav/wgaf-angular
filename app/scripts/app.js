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
    'ui.router',
    'config',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'siyfion.sfTypeahead',
    'angular-loading-bar',
    'ui.utils'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, flashProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        abstract: true
      })
      .state('main.share', {
        url: '',
        templateUrl: 'views/share-link.html'
      })
      .state('main.follow', {
        url: '',
        templateUrl: 'views/follow.html'
      })
      .state('cover', {
        url: '/',
        templateUrl: 'views/cover.html',
        controller: 'CoverCtrl'
      })
      .state('cover.sign-in', {
        url: 'signin',
        templateUrl: 'views/sign-in.html'
      })
      .state('cover.sign-up', {
        url: 'signup',
        templateUrl: 'views/sign-up.html'
      })
      .state('cover.sign-up.verify', {
        url: '',
        templateUrl: 'views/verify-email.html'
      });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('authInterceptor');

    flashProvider.errorClassnames.push('alert-danger');
    flashProvider.warnClassnames.push('alert-warn');
    flashProvider.infoClassnames.push('alert-info');
    flashProvider.successClassnames.push('alert-success');

  })
  .run(function($state, $window, $rootScope) {

    // authorization for protected states

    var needSignIn = [
      /^main/,
    ];

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      for (var i = 0; i < needSignIn.length; ++i) {
        if (needSignIn[i].test(toState.name) && !$window.sessionStorage.user) {
          event.preventDefault();
          $state.go('cover');
        }
      }
    });

  });
