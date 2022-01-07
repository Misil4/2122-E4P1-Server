import ChatModel from "../models/chatModel.js";

export const chatSocket = (io) => {
    io.sockets.on("connection" ,(socket) => {
        socket.on("chat message",msg => {
            console.log("message")
            io.sockets.emit("chat message",msg);
        })
        socket.on("insert_message",message => {
            ChatModel.create(message,(err,docs) =>{
                if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
                ChatModel.find({}).then(docs => {
                    io.sockets.emit("update_messages",docs)
                })
            })
            })
        })
    }