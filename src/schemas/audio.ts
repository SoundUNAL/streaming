import { Schema } from 'mongoose'

export const AudioSchema = new Schema({
    name : {type : String, require : true},
    id : String,
    createAt : {
        type : Date,
        default : Date.now
    }
});
