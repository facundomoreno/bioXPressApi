const { 
    createStore, 
    updateStore, 
    deleteStore, 
    getStores, 
    getStoresById 
} = require("../methods/Stores/store.controller");
const router = require("express").Router();
const {checkToken} = require('../../auth/TokenValidation');





//defino las rutas, su tipo y los métodos asociados

router.post("/createStore", checkToken, createStore);
router.post("/updateStore", checkToken, updateStore);
router.patch("/deleteStore/:id_store", checkToken, deleteStore);
router.get("/getStores", checkToken, getStores);
router.get("/getStoresbyid/:id_store", checkToken, getStoresById);

module.exports = router;