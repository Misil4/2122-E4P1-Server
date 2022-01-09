import ChatModel from '../models/chatModel.js'

export const chatSocket = (io) => {
    io.sockets.on("connection", (socket) => {
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username,
            });
        }
        socket.emit("users", users);
        console.log('hola')
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
        });
        socket.on("private message", ({ content, to }) => {
            socket.to(to).emit("private message", {
                content,
                from: socket.id,
            });
        });
        socket.on("disconnect", () => {
            socket.broadcast.emit("user disconnected", socket.id);
        });
    });

}