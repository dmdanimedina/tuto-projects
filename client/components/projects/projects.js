/**
 * Created by samtech on 23-01-17.
 */
import { Meteor } from 'meteor/meteor';

Template.projects.events({
    'click .remove': function(event, template){
       // console.log(this._id);
        Meteor.call('projects.remove',this._id)
    },
    'click .sql': function(event, template){
        // console.log(this._id);
        Meteor.call('execSql');
        Meteor.call('dbquery',(err,res) => {
            console.log(res);
        })
    }
});

Template.projects.onCreated(function(){
console.log(Meteor.subscribe('listQuery'));
    this.autorun( computation => {
     this.skill = this.subscribe('listQuery');
    })
})

Template.projects.helpers({
    rows: function(){
            console.log(Template.instance());
        //return Template.instance();
    }
})