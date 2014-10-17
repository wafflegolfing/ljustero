angular.module('specialDatesFactory',
[]).factory('specialDates', function () {
	return {
		isSpecialDate: function (date, onlyRed) {
			for (var special in SPECIAL_DATES) {
				if (moment(date).format('YYYY-MM-DD') === SPECIAL_DATES[special].date) {
					if (onlyRed && SPECIAL_DATES[special].red) {
						return true;
					}
					return SPECIAL_DATES[special].type;
				}
			}
			return false;
		},
		isItA: function (d) {
			var m = moment(d).format('M');
			if (m === '6' || m === '7' || m === '8') {
				return true;
			}
			return false;
		},
		isItC: function (d) {
			var day = moment(d).day();
			var w = moment(d).isoWeek();
			if (w > 11 && w < 45  && (day === 5 || day === 6)) {
				return true;
			}
			return false;
		},
		isItD: function (d) {
			var day = moment(d).day();
			var w = moment(d).isoWeek();
			if (w > 11 && w < 45 && (day === 0 || this.isSpecialDate(d, true)) ) {
				return true;
			}
			return false;
		},
		isItE: function (d) {
			var day = moment(d).day();
			var m = moment(d).format('M');
			if ((m === '6' || m === '7' || m === '8') && (day === 5)) {
				return true;
			}
			return false;
		}
	};
});


