angular.module('timeFilters',
[]).filter('getDay', function() {
  return function(time) {
      var m = moment(time, 'X').diff(moment(), 'minutes');
      var d;
      if (m < 60) {
        return 'minuter';
      }
      d = moment(time, 'X').diff(moment(), 'days');
      if (d > 1) {
        return moment(time, 'X').format('dddd');
      }
    return moment(time, 'X').calendar();
  };
}).filter('fromNow', function() {
  return function(time, index) {
    var m;
    if (index || index === 0) {
      if (index) { return; };
      m = moment(time, 'X').diff(moment(), 'minutes');
      if (m <= 20 && m > 10) { return 'yellow'; }
      if (m <= 10 && m > 5) { return 'orange'; }
      if (m <= 5) { return 'red'; }
      if (m > 60) { return 'small1stChild';}
      return;
    }
    m = moment(time, 'X').diff(moment(), 'minutes');
    if (m < 60) {
      return m;
    } else {
      return moment(time, 'X').format('HH.mm');
    }
  };
});
