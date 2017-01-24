/**
 * Created by samtech on 23-01-17.
 */
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Notes = new SimpleSchema({
    note:{
        type: String,
        label: "Nota"
    }
})