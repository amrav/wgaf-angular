'use strict';

/**
 * @ngdoc service
 * @name wgafApp.linksLoader
 * @description
 * # linksLoader
 * Factory in the wgafApp.
 */
angular.module('wgafApp')
  .factory('linksLoader', function (db, flash, $http, API, $log) {
    return {
      links: [],
      busy: false,
      page: 0,
      limit: null,
      done: false,
      username: null,
      initialize: function(username) {
        this.username = username;
        this.links = db.links[username] || [];
      },
      loadLinks: function() {
        var that = this;
        if (that.busy) {
          return;
        }
        if (that.limit && that.page >= that.limit) {
          that.done = true;
          return;
        }
        that.busy = true;
        $http.get(API + '/users/' + that.username + '/links?page=' + that.page +
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
            db.links[that.username] = that.links;
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
