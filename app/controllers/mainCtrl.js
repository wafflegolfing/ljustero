'use strict';
var MainCtrl = function ($rootScope, $scope, broadcaster) {
  var a = ("abcdefghijklmnopqrstuvwxyz").split("");
  $scope.obfuscated = a[22]
                    + a[0]
                    + a[5]
                    + a[5]
                    + a[11]
                    + a[4]
                    + a[6]
                    + a[14]
                    + a[11]
                    + a[5]
                    + a[8]
                    + a[13]
                    + a[6];
};

MainCtrl.$inject = ['$rootScope', '$scope', 'broadcaster'];