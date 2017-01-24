/**
 * Created by samtech on 23-01-17.
 */
import { Meteor } from 'meteor/meteor';

Template.projects.events({
    'click .remove': function(event, template){
       // console.log(this._id);
        Meteor.call('projects.remove',this._id)
    }
})