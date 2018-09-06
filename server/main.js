import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import './scrap';

SyncedCron.add({
  name: 'Get Calendar from ecampus',
  schedule: function (parser) {
    return parser.text('every 5 minutes');
  },
  job: function () {
    Meteor.call('Data.getAllData');
  }
});

SyncedCron.start();

Meteor.startup(() => {
  // Meteor.call('Data.getAllData');
});