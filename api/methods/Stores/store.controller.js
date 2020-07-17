const { 
        createStore, 
        updateStore,
        deleteStore,
        getStores,
        getStoresById
    } = require("./store.service");

    const decodeToken = require('../../../auth/TokenValidation')
module.exports = {

    createStore: (req, res) => {
        const body = req.body;
        const type = decodeToken(req).ds_type                      
        if(type != "vendedor"){
            return res.status(401).json({
                success:0,
                message: "Usuario sin permisos para esta acción"

            });            
        
        }
        createStore(body, (err, results) => {
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

    updateStore: (req, res) => {
        const body = req.body;
        const type = decodeToken(req).result.ds_type                      
        if(type != "vendedor"){
            return res.status(401).json({
                success:0,
                message: "Usuario sin permisos para esta acción"

            });            
        
        }
        updateStore(body, (err, results) => {
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

    deleteStore: (req, res) => {
        const id = req.params.id_store;
        deleteStore(id, (err, results) => {
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

    getStores: (req, res) => {
        const body = req.body;
       
        getStores (body, (err, results) => {
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

    getStoresById: (req, res) => {
        const id = req.params.id_store
        getStoresById(id, (err, results) => {
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