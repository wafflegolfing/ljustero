'use strict';
angular.module('getFerriesFactory',
[
  'kindOfDayFactory',
]).factory('getFerries', function (kindOfDay) {
  return function (destination, ignored) {
    var getTheFerries = function (direction, type, ignored) {
      var nowInUnix = moment().format('X');
      var output = [];
      var buildTimeStr = function (hhmm) {
        var ferryInUnix = moment(moment(type.date).format('YYYY-MM-DD') + ' ' + hhmm, 'YYYY-MM-DD hhmm').format('X');
        if (nowInUnix > ferryInUnix || ignored[direction].indexOf(ferryInUnix) !== -1) {
          return;
        }
        return output.push(ferryInUnix);
      }
      var allFerries = ferryTimeSchedules[direction][type.type];
      var time;
      var specials;
      for (var i = 0, j = allFerries.length; i < j; i++) {
        time = '';
        specials = [];
        if (allFerries[i].length > 4) { // special time
          time = allFerries[i].substring(0,4);
          specials = allFerries[i].substring(4,7).split(',');
          for (var k = 0, g = specials.length; k < g; k++) {
            if (type[specials[k]]) {
              buildTimeStr(time);
              break;
            }
          }
        } else if (allFerries[i]) {
          buildTimeStr(allFerries[i]);
        }
      }
      return output.sort();
    };

    var todaysFerries = getTheFerries(destination, kindOfDay(), ignored);

    if (todaysFerries.length < 20) {
      todaysFerries = todaysFerries.concat(getTheFerries(destination, kindOfDay(1), ignored));
    }
    return todaysFerries;
  }
});

