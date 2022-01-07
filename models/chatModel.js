import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

const chatSchema = new Schema({
    id : String,
    timestamp : String,
    message: String,
    user: String
})

const ChatModel = Mongoose.model("chats", chatSchema);

export default ChatModel