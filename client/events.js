import {Template} from "meteor/templating";
import tz from "moment";
/*Events = new Mongo.Collection( 'events' );

const addTest = function() {
	Events.insert([
			{ title: 'DROIT', start: '2018-03-23', end: '2018-03-24', editable: true, type: 'Corporate', guests: 50 },
			{ title: 'PROJET', start: '2018-03-21', end: '2018-03-22', editable: false, type: 'Wedding', guests: 200 }
		]
	)};

addTest();*/
/*let isPast = ( date ) => {
	let today = moment().format();
	return moment( today ).isAfter( date );
};*/
/*Template.ecalendar.onCreated( () => {
	let template = Template.instance();
	template.subscribe( Events );
});*/

Template.ecalendar.onRendered( function() {
	$('#events-calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: function(start, end, timezone, callback) {
			let events = [];
			let event = Events.find().fetch();
			event.forEach(function(evt) {
				events.push({
					title: evt.title,
					teacher: evt.teacher,
					start: evt.start,
					end: evt.end
				});
			});
			callback(events);
		},

		editable:true,
		selectable: true,
		allDayDefault: false,
		defaultView: 'agendaWeek',
	})

});
Tracker.autorun( () => {
	Events.find().fetch();
	$( '#events-calendar' ).fullCalendar( 'refetchEvents' );
});
