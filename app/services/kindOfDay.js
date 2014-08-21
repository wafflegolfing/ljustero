'use strict';
angular.module('kindOfDayFactory', [
	'specialDatesFactory'
]).factory('kindOfDay', function (specialDates) {
	return function (days) {
		var today = moment();
		var weekday;
		var type = 'reg';
		if (days) {
			today = moment().add(days, 'days');
		}
		//today = moment('2014-12-29', 'YYYY-MM-DD');
		var isA = specialDates.isItA(today);
		var isB = specialDates.isItB(today);
		var isC = specialDates.isItC(today);
		var isD = specialDates.isItD(today);
		var isE = specialDates.isA;
		var specialDate = specialDates.isSpecialDate(today);
		var output;
		weekday = today.format('d');
		if (weekday === '5') {
			type = 'fri';
		}
		if (weekday === '0' || weekday === '6') {
			type = 'wkd';
		}
		if (specialDate) {
			if (specialDate === 'A') {
				isA = true;
			}
			if (specialDate === 'C') {
				isC = true;
			}
			if (specialDate === 'wkd') {
				type = 'wkd';
			}
		}
		output = { date: today, type: type, A: isA, B: isB, C: isC, D: isD, E: isE };
		/*
		console.log('datum', today.format('YYYY-MM-DD'));
		console.log('veckodag', today.format('dddd'));
		console.log('vecka', today.isoWeek());
		console.log('special', specialDates.isSpecialDate(today));
		console.log(output);
		*/
		return output;
	};
});