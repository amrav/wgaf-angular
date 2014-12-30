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
    'ui.utils',
    'infinite-scroll',
    'angularMoment'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, flashProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        abstract: true
      })
      .state('main.dashboard', {
        url: '',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('main.share', {
        url: 'share',
        templateUrl: 'views/share-link.html',
        controller: 'ShareCtrl'
      })
      .state('main.follow', {
        url: 'follow',
        templateUrl: 'views/follow.html',
        controller: 'FollowCtrl'
      })
      .state('cover', {
        url: '/',
        templateUrl: 'views/cover.html',
        controller: 'CoverCtrl'
      })
      .state('cover.sign-in', {
        url: 'sign-in',
        templateUrl: 'views/sign-in.html'
      })
      .state('cover.sign-up', {
        url: 'sign-up',
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
