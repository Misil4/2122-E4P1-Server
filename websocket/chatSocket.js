import ChatModel from '../models/chatModel.js'

export const chatSocket = (io) => {
    io.sockets.on("connection", (socket) => {
        socket.on("join", (room) => {
            socket.join(room)
            console.log(`ROOM JOINED SUCCESFULLY`)
            console.log(socket.rooms)
        })
        socket.on("insert_message", (data) => {
            io.to(data.room).emit("updated_messages", data)
        });

    })
}