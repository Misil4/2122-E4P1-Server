import  Mongoose  from "mongoose";
const Schema = Mongoose.Schema;

const UserSchema = Schema({
    name : String,
    last_name: String,
    email : String,
    rol : String,
    login_status : Boolean,
    picture : String
})
const UserModel = Mongoose.model('users',UserSchema);
export default UserModel;