'use strict';
angular.module('geoLocateFactory',
[]).factory('geoLocate', function () {
  return function (cb) {

    if (!navigator.geolocation) {
        return cb('no geolocate');
    }
    if (navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
        return cb('firefox');
    }

    navigator.geolocation.getCurrentPosition(function (pos) {
      var latitude, longitude, geocoder, latlng;

      if (!pos.coords || !pos.coords.latitude || !pos.coords.longitude) {
          return cb('no geolocate 2');
      }

      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;
      geocoder = new google.maps.Geocoder();
      //latitude = '59.529757'; // ljusterö lat
      //longitude = '18.613498'; // ljusterö long
      latlng = new google.maps.LatLng(latitude, longitude);
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        var isOnIsland = false;
        if (status != google.maps.GeocoderStatus.OK) {
            return cb();
        }
        if (!results[0] || !results[0].address_components) {
            return cb();
        }
        results[0].address_components.forEach(function (c) {
            if (c.long_name
                && (c.long_name.indexOf('Ljusterö') !== -1
                || c.long_name.indexOf('18495') !== -1)) {
                isOnIsland = true;
            }
        });
        results[0].address_components.forEach(function (c) {
            if (c.long_name
                && (c.long_name.indexOf('Grönborgsvägen') !== -1
                || c.long_name.indexOf('Roslagsvägen') !== -1)) {
                isOnIsland = false;
            }
        });
        if (!isOnIsland) {
            return cb();
        }
        return cb(null, true);
      });
    }, function (err) {
        return cb(err);
    });
  };
});
