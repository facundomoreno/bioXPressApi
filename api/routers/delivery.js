const { 
    createDelivery,
    updateDelivery,
    deleteDelivery,
    getCartForDelivery,
    getDeliveriesByIdUser,
    getDeliveryById,
    getAllDeliveries 
} = require("../methods/Deliveries/delivery.controller");
const router = require("express").Router();
const {checkToken} = require('../../auth/TokenValidation');

router.post("/createDelivery", checkToken, createDelivery);
router.post("/deleteDelivery", checkToken, deleteDelivery);
router.post("/updateDelivery", checkToken, updateDelivery);
router.get("/getDeliveryByIdUser", checkToken, getDeliveriesByIdUser);
router.get("/getDeliveryById/:id_delivery", checkToken, getDeliveryById);
router.get("/getCartForDelivery/:id_delivery", checkToken, getCartForDelivery);
router.get("/getAllDeliveries", checkToken, getAllDeliveries);

module.exports = router;