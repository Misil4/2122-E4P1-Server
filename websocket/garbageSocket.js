import GarbageModel from "../models/garbageModel.js";
import UserModel from "../models/userModel.js";

export const garbageSocket = (socket) => {
        socket.on("garbage_data", (email) => {
          UserModel.findOne({email : email}, (err, docs) => {
            if (err) return console.log("error al realizar la peticion")
            if (!docs) return console.log("no existe el user")
            GarbageModel.find({ completed: false }).then(data => {
                console.log("TRASH DATA")
                console.log(data)
              socket.to(docs.socket).emit("get_trash", data);
            })
          })
          }) 
          socket.on("garbage_update", (id_basura) => {
            GarbageModel.updateOne({_id: id_basura}, { $set: {completed: true} }, { new: true }, (err, docs) => {
              if (err) return console.log("error al realizar la peticion")
              if (!docs) return console.log("no existe el user")
              GarbageModel.find({ completed: false }).then(docs => {
                console.log("TRASH DATA")
                console.log(docs)
              socket.emit("change_trash", docs);
            })
          })
          })
          socket.on("insert_garbage", (garbage) => {
            const data = {
              location: garbage.data,
              completed: false,
              user: garbage.user,
              date: new Date(parseInt(garbage.data.timestamp))
          };
          console.log("Garbage insert data")
          console.log(data)
              GarbageModel.create({location: {latitude: data.location.latitude, longitude: data.location.longitude, timestamp:data.date}, completed: data.completed, user: data.user},(err,docs) =>{
                if (err) return console.log("error al realizar la peticion", err)
                if (!docs) return console.log("no existe el user")
                  GarbageModel.find({ completed: false }).then(docs => {
                    console.log("TRASH DATA")
                    console.log(docs)
                  socket.emit("change_trash", docs);
                })
              })
          })
}