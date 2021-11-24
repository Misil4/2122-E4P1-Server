import  Mongoose  from "mongoose";
import UserModel from "./userModel.js";
const Schema = Mongoose.Schema;

const GarbageSchema = Schema({
    location : { latitude: Number, longitude: Number , timestamp: String},
    message : String,
    user : { type: Schema.Types.ObjectId, ref: UserModel }
})
const GarbageModel = Mongoose.model('garbages',GarbageSchema);
export default GarbageModel;