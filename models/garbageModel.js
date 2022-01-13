import  Mongoose  from "mongoose";
import UserModel from "./userModel.js";
const Schema = Mongoose.Schema;

const GarbageSchema = Schema({
    location : { latitude: Number, longitude: Number , timestamp: String},
    message : String,
    completed : Boolean,
    user : String,

})
const GarbageModel = Mongoose.model('garbages',GarbageSchema);
export default GarbageModel;