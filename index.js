import  Express  from "express";
import Mongoose  from "mongoose";
const mongodbRoute = 'mongodb+srv://users:users@cluster0.5dz1w.mongodb.net/ballin'
import router from "./routes/routes.js";

const app  = Express();
const port = process.env.PORT || 3001;
app.use (Express.urlencoded({ extended: false}));
app.use (Express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
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
      app.listen(port, () => {
          console.log(`Servidor up en ${port}`);
      });
      console.log(`Conexión con Mongo correcta.`)
  })
    
  