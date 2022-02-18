import UserModel from "../models/userModel.js"

export const userSocket = (io, socket) => {
  socket.on("user_data", (email) => {
    console.log(socket.adapter.rooms)
    UserModel.findOne({ email: email }, (err, docs) => {
      if (err) return console.log("error al realizar la peticion")
      if (!docs) return console.log("no existe el user")
      UserModel.find({ rol: "user" }).then(data => {
        io.to(docs.socket).emit("get_users", data);
      })
    })
  })
  socket.on("qr_scanned", (email) => {
    try {
      UserModel.findOne({ email: email }, (err, user) => {
        console.log("pepe")

        io.emit("scanned", true)
      })
    } catch (error) {
      console.error(error)
    }
  })
  socket.on("badge_update", (email) => {
    try {
      console.log(email)
      let login_status = true;
      UserModel.findOne({ email: email }, (err, docs) => {
        console.log(docs.socket)
        if (docs.login_status) {
          login_status = false
        }
        UserModel.updateOne({ email: email }, { $set: { login_status: login_status } }, { new: true }, (err, docs) => {
          if (err) return console.log("error al realizar la peticion")
          if (!docs) return console.log("no existe el user")
          UserModel.find({ rol: "user" }).then(data => {
            io.to("admin").emit("change_data", data);
          })
        })
      })
    }
    catch (error) {
      console.error(error)
    }
  })
}