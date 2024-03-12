import { Schema } from 'mongoose'

export const AudioSchema = new Schema({
    nombreCancion : {type : String, require : true},
    id_direciion : {type : String, require : true},
    createAt : {
        type : Date,
        default : Date.now
    }
});
