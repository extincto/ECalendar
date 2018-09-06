import moment from 'moment';
import tz from 'moment';

parseCalendar = (calendarString) => {
	const calendarArray = calendarString.split('\n');
	// console.log('cal', calendarArray)
	// const Courses = [];
	let result = {
		start: null,
		end: null,
		title: null,
		teacher: null,
	};
	calendarArray.forEach((calendarLine) => {
		const s = /DTSTART.+:(.+)/g.exec(calendarLine);
		let start;
		if (!!s && s.length === 2 && !!s[1]) {
			result.start = tz(s[1]).t.moment().format('YYYY-MM-DD H:mm');/*.tz('Europe/Paris').format('YYYY-MM-DD H:mm'); format nedded ISO 8601*/ //TODO format need ISO 8601 format
			// console.log(result.statValue);
		}
		const e = /DTEND.+:(.+)/g.exec(calendarLine);
		let end;
		if (!!e && e.length === 2 && !!e[1]) {
			result.end = tz(e[1]).t.moment().format('YYYY-MM-DD');/*tz('Europe/Paris').format('YYYY-MM-DD H:mm');*/
			// console.log(result.endValue);
		}
		const t = /SUMMARY:(.+)/g.exec(calendarLine);
		let title;
		if (!!t && t.length === 2 && !!t[1]) {
			result.title = t[1];
			// console.log(result.summaryValue);
		}
		const te = /DESCRIPTION:(.+)/g.exec(calendarLine);
		let teacher;
		if (!!te && te.length === 2 && !!te[1]) {
			result.teacher = te[1];
			// console.log(result.descriptionValue);
		}

		if (!!result.start && !!result.end && !!result.title && !!result.teacher) {
			console.log(result);
			Events.insert(result);
			result = {
				start: null,
				end: null,
				title: null,
				teacher: null,
			}
		}
	});
	console.log('res', Events);
};
