const { 
    createDelivery,
    updateDelivery,
    deleteDelivery,
    getCartForDelivery,
    getDeliveriesByIdUser,
    getDeliveryById,
    getAllDeliveries,
    createCartWithProduct,
    removeProduct,
    deleteCart,
    getCartProducts,
    updateCartStatus,
    insertProductToCart 
} = require("../methods/Purchases/purchase.controller");
const router = require("express").Router();
const {checkToken} = require('../../auth/TokenValidation');

router.post("/createDelivery", checkToken, createDelivery);
router.post("/deleteDelivery", checkToken, deleteDelivery);
router.post("/updateDelivery", checkToken, updateDelivery);
router.get("/getDeliveryByIdUser", checkToken, getDeliveriesByIdUser);
router.get("/getDeliveryById/:id_delivery", checkToken, getDeliveryById);
router.get("/getCartForDelivery/:id_delivery", checkToken, getCartForDelivery);
router.get("/getAllDeliveries", checkToken, getAllDeliveries);

//cart methods
router.post("/createcart", checkToken, createCartWithProduct);
router.post("/deletecart/:id_cart", checkToken, deleteCart);
router.post("/removecartproduct/:id_cart_prod", checkToken, removeProduct);
router.get("/getcartproducts/:id_cart", checkToken, getCartProducts);
router.post("/updatecartstatus", checkToken, updateCartStatus);
router.post("/insertproduct", checkToken, insertProductToCart);

module.exports = router;