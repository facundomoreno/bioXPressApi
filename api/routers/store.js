const { createStore, updateStore, deleteStore, getStores, getStoresById } = require("../methods/Stores/store.controller");
const router = require("express").Router();






//defino las rutas, su tipo y los métodos asociados

router.post("/createStore", createStore);
router.post("/updateStore", updateStore);
router.patch("/deleteStore/:id_store", deleteStore);
router.get("/getStores", getStores);
router.get("/getStoresbyid/:id_store", getStoresById);

module.exports = router;