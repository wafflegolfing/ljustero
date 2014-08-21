'use strict';
var Ferries = function ($scope, $timeout, broadcaster, getFerries, geoLocate) {
  var removed = {
    to: [], from: []
  };
  var destination = 'to';
  var timer;

  var setData = function() {
    var todaysFerries = getFerries(destination, removed);
    $timeout.cancel(timer);
    broadcaster.broadcast('set', destination === 'to' ? 'Ljusterö' : 'Östanå');
    $scope.ferries = todaysFerries;
    timer = $timeout(setData, ((59 - moment().format('ss')) * 1000));
  }

  $scope.remove = function () {
    removed[destination].push($scope.ferries[0]);
    $scope.ferries.splice(0, 1);
  };

  $scope.$on('handleBroadcast', function (event, message, param) {
    if (message === 'changed') {
      destination = (destination === 'to' ? 'from' : 'to')
        $timeout(setData, 0);
    }
  });
  //return $timeout(setData, 0);
  geoLocate(function (err, res) {
    if (err || !res) {
      return $timeout(setData, 0);
    }
    destination = 'from';
    return $timeout(setData, 0);
  });
};

Ferries.$inject = ['$scope', '$timeout', 'broadcaster', 'getFerries', 'geoLocate'];