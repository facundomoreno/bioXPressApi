require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const userRouter = require("./api/routers/user")


//uso las rutas para acceder a los métodos
app.use("/user", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server corriendo en el puerto: ", process.env.APP_PORT);
});