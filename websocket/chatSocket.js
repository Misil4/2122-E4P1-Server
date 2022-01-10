import ChatModel from '../models/chatModel.js'

export const chatSocket = (io) => {
    io.sockets.on("connection", (socket) => {
        socket.on("get_messages", (data) => {
            ChatModel.find({ from: { $ne: data.from },room : data.room }).then(docs => {
                io.sockets.emit("messages", docs)
            })
        })
            socket.on("join", (room) => {
                socket.join(room)
                console.log("ROOM JOINED SUCCESFULLY")
            })
            socket.on("insert_message", (data) => {
                ChatModel.create(data);
                io.to(data.room).emit(data)
                console.log("MESSAGE CREATED")
            })
    });

}