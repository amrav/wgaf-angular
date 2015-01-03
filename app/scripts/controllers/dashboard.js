'use strict';

/**
 * @ngdoc function
 * @name wgafApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the wgafApp
 */
angular.module('wgafApp')
  .controller('DashboardCtrl', function ($scope, API, $http, flash, $log) {
    $scope.loader = {
      links: $scope.links,
      busy: false,
      page: 0,
      done: false,
      loadLinks: function() {
        var that = this;
        that.busy = true;
        $http.get(API + '/users/' + $scope.user.username + '/links?page=' + that.page +
                  '&limit=40')
          .success(function(data) {
            if (data.length < 20) {
              that.done = true;
              if (data.length === 0) {
                return;
              }
            }
            if (that.page === 0) {
              that.links = [];
            }
            that.links =
              _.uniq(_.sortBy(that.links.concat(data), function(link) {
                return -link.time;
              }), true, 'time');
            $scope.links = that.links;
            that.page += 1;
          })
          .error(function(data) {
            flash.error = 'Something went wrong...';
            $log.error(data);
            that.done = true;
          })
          .finally(function() {
            that.busy = false;
          });
      }
    };
  });
