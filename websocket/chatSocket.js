import ChatModel from '../models/chatModel.js'

export const chatSocket = (io) => {
    io.sockets.on("connection", (socket) => {
        socket.on("get_messages", (data) => {
            ChatModel.find({room : data.room }).then(docs => {
                io.to(data.room).emit("messages", docs)
            })
        })
            socket.on("join", (room) => {
                socket.join(room)
                console.log(`ROOM JOINED SUCCESFULLY`)
                console.log(socket.rooms)
            })
            socket.on("insert_message", (data) => {
                ChatModel.create(data);
                ChatModel.find({room : data.room }).then(docs => {
                    io.to(data.room).emit("updated_messages", docs)
            })
        })
    });

}