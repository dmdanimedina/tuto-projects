/**
 * Created by samtech on 23-01-17.
 */
import { Projects } from '../../../lib/collections/projects';

Template.projectForm.helpers({
    formCollection(){
        return Projects;
    }
})