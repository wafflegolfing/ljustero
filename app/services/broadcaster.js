'use strict';
angular.module('broadcasterFactory',
[]).factory('broadcaster', function ($rootScope) {
  return {
    broadcast: function (msg, param) {
      $rootScope.$broadcast('handleBroadcast', msg, param);
    }
  }
});