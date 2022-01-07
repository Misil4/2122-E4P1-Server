import Express from "express";
import Mongoose from "mongoose";
import { createRequire } from "module";
import UserModel from "./models/userModel.js";
import GarbageModel from "./models/garbageModel.js";
const require = createRequire(import.meta.url);
const mongodbRoute = process.env.MONGO_DB_URI
import router from "./routes/routes.js";
import { Server } from "socket.io";
import { userSocket } from "./websocket/userSocket.js";
import { garbageSocket } from "./websocket/garbageSocket.js";
const app  = Express();
const port = process.env.PORT || 3001;
const http = require('http')
const server = http.createServer(app)

const socketIO = require('socket.io');
const io = socketIO(server);
io.on('connection', socket => {
  console.log('client connected on websocket');
  socket.on('disconnect', () => {
    console.log("disconnected")
  })
  userSocket(io);
  garbageSocket(io);
});

server.listen(port, () => {
  console.log('server started and listening on port ' + port);
});

app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


app.use(router);
const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  useNewUrlParser: true
};
Mongoose.Promise = global.Promise
Mongoose.connect(mongodbRoute, options, (err) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }


  console.log(`Conexión con Mongo correcta.`)
})
