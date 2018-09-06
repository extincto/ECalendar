import { Template } from 'meteor/templating';
import './main.html';

Template.Index.helpers({
  events() {
    return Events.find();
  }
});
