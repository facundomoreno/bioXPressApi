const { 
   createDelivery,
   deleteDelivery,
   getDeliveriesByIdUser,
   getDeliveryById,
   getCartForDelivery,
   updateDelivery,
   getAllDeliveries
} = require("./purchase.service");

const {decodeToken} = require('../../../auth/TokenValidation')
module.exports = {

createDelivery: (req, res) => {
    const body = req.body;
    createDelivery(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
},

deleteDelivery: (req, res) => {
    const body = req.body;
    deleteDelivery(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
},


updateDelivery: (req, res) => {
    const body = req.body;
    updateDelivery(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
},

getDeliveriesByIdUser: (req, res) => {
    const id_user = decodeToken(req).result.id_user                      
    getDeliveriesByIdUser (id_user, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
},

getAllDeliveries: (req, res) => {
    const type = decodeToken(req).result.ds_type
    if (type != "administrador") {
        return res.status(401).json({
          success: 0,
          message: "Usuario sin permisos para esta acción",
        });
      }                      
    getAllDeliveries (req.body,(err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
},

getDeliveryById: (req, res) => {
    const id = req.params.id_delivery
    getDeliveryById(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
},

getCartForDelivery: (req, res) => {
    const id = req.params.id_delivery
    getCartForDelivery(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "database connection error",
            });
        }
        return res.status(200).json({
            success: 1,
            data: results,
        });
    });
},

} 