const { createUser, login } = require("../methods/Users/user.controller");
const router = require("express").Router();






//defino las rutas, su tipo y los métodos asociados

router.post("/createUser", createUser);
router.post("/login", login);

module.exports = router;