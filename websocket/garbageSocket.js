import GarbageModel from "../models/garbageModel.js";

export const garbageSocket = (io) => {
    io.sockets.on("connection",(socket) => {
        socket.on("garbage_data", () => {
            GarbageModel.find({ completed: false }).then(docs => {
                console.log("TRASH DATA")
                console.log(docs)
              io.sockets.emit("get_trash", docs);
            })
          }) 
          socket.on("garbage_update", (id_basura) => {
            GarbageModel.updateOne({_id: id_basura}, { $set: {completed: true} }, { new: true }, (err, docs) => {
              if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
              if (!docs) return res.status(404).send({ message: `No existe ese user` });
              GarbageModel.find({ completed: false }).then(docs => {
                console.log("TRASH DATA")
                console.log(docs)
              io.sockets.emit("change_trash", docs);
            })
          })
          })
          socket.on("insert_garbage", (garbage) => {
            const data = {
              location: garbage.data,
              message : "Recoger basura aquí",
              completed: false,
              user: garbage.user,
              date: new Date(parseInt(garbage.data.timestamp))
          };
              GarbageModel.create({location: {latitude: data.location.latitude, longitude: data.location.longitude, timestamp:data.date}, message : data.message, completed: data.completed, user: data.user},(err,docs) =>{
                  if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
                  GarbageModel.find({ completed: false }).then(docs => {
                    console.log("TRASH DATA")
                    console.log(docs)
                  io.sockets.emit("change_trash", docs);
                })
              })
          })
    })
}