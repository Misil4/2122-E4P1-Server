import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

const chatSchema = new Schema({
    from : String,
    to: String,
    text: String,
    timestamp : String,
    room: String
})

const ChatModel = Mongoose.model("chats", chatSchema);

export default ChatModel