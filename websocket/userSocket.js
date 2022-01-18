import UserModel from "../models/userModel.js"

export const userSocket = (socket) => {
        socket.on("user_data", () => {
            UserModel.find({ rol: "user" }).then(docs => {
              socket.emit("get_users", docs);
            })
          })
          socket.on("badge_update", (email) => {
            console.log("estamos en el server")
            console.log(email)
            let login_status = true;
              UserModel.findOne({ email: email }, (err, docs) => {
                if (docs.login_status) {
                  login_status = false
                }
                UserModel.updateOne({ email: email }, { $set: { login_status: login_status } }, { new: true }, (err, docs) => {
                  if (err) return console.log("error al realizar la peticion")
                  if (!docs) return console.log("no existe el user")
                  UserModel.find({ rol: "user" }).then(docs => {
                    socket.emit("change_data",docs);
                  })
                })
              })
    })
}