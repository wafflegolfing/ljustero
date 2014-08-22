'use strict';
var Destination = function ($scope, broadcaster) {
  $scope.$on('handleBroadcast', function (event, message, param) {
    if (message === 'set') {
      $scope.dest = param;
    }
  });
    $scope.change = function (param) {
      broadcaster.broadcast('changed');
  }
};

Destination.$inject = ['$scope', 'broadcaster'];