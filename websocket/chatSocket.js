import ChatModel from '../models/chatModel.js'

export const chatSocket = (socket) => {
        socket.on("join", (room) => {
            socket.join(room)
            console.log(`ROOM JOINED SUCCESFULLY`)
            console.log(socket.rooms)
        })
        socket.on("insert_message", (data) => {
            console.log("USER DATA")
            console.log(data)
            console.log("ACTIVE ROOMS")
            console.log(socket.adapter.rooms)
            socket.to(data.room).emit("updated_messages", data)
        });
        socket.on("leave", (room) => {
            console.log(`ROOM LEAVED SUCCESFULLY`)
            console.log(socket.adapter.rooms)
            socket.leave(room)
        })
}