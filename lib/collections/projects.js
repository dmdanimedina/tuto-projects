/**
 * Created by samtech on 20-01-17.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Notes } from './notes';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Projects = new Mongo.Collection('projects');

export const ProjectsIndex = new EasySearch.Index({
    collection: Projects,
    fields: ['name','summary'],
    engine: new EasySearch.Minimongo(),
    defaultSearchOptions: {limit: 2}
})

Projects.attachSchema( new SimpleSchema({

    name:{
        type: String,
        label: "Nombre del proyecto",
        max:200
    },
    owner:{
        type: String,
        label: "propietario",
        autoValue(){
            return this.userId
        },
        autoform:{
            type: "hidden"
        }
    },
    created:{
        type: Date,
        autoValue(){
            return new Date()
        },
        autoform:{
            type: "hidden"
        }
    },
    summary:{
        type: String,
        label: "Detalle del proyecto",
        optional: true,
        max: 2000,
        autoform:{
            type: "textarea",
            rows:10,
            class :"materialize-textarea"
        }
    },
    notes:{
        optional: true,
        type: [Notes]
    }
}));

Projects.allow({
    insert: function(userid,doc){
        return doc.owner === userid;
    }
});

Meteor.methods({
   'projects.remove'(projectId){
       check(projectId,String);
       Projects.remove(projectId);
   }
});