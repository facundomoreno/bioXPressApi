require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const userRouter = require("./api/routers/user")


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,DELETE,POST,PUT"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

//uso las rutas para acceder a los métodos
app.use("/user", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server corriendo en el puerto: ", process.env.APP_PORT);
});