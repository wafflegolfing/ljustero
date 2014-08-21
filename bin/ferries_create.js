var fs = require('fs');
var tt = require('./ferries_raw.js');
var moment = require('./../bower_components/moment/moment.js');
var from = {
	reg: [],
	fri: [],
	wkd: []
};
var to = {
	reg: [],
	fri: [],
	wkd: []
};

for (var type in tt.from) {
	for (var hh in tt.from[type]) {
		var mm = tt.from[type][hh].split(' ');
		for (var i = 0; i < mm.length; i++) {
			if (mm[i] !== '') {
				from[type].push(hh.toString() + mm[i].toString());
			}
		}
	}
};

for (var type in tt.to) {
	for (var hh in tt.to[type]) {
		var mm = tt.to[type][hh].split(' ');
		for (var i = 0; i < mm.length; i++) {
			if (mm[i] !== '') {
				to[type].push(hh.toString() + mm[i].toString());
			}
		}
	}
};

var file = JSON.stringify({ to: to, from: from });
file = 'var ferries = ' + file;
fs.writeFile('./../app/vendor/ferriesTimeSchedule.js', file, function (error, result) {
	if (error) {
		return console.log(error);
	}
	return console.log('done');
});
