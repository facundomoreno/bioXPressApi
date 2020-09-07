const {
    uploadProduct,   
    getProductsByIdStore,    
    getProductsByFilters,
    createProductCategory,
    updateProductCategory,
    getProductsCategories,
    getProductByIdProduct,
    getProductsByCategory,
    createDiscount,
    getProductsWithDiscount,
    recommendedProducts
    
} = require('./products.service');

const {decodeToken} = require('../../../auth/TokenValidation')



module.exports = 
{
    uploadProduct: (req, res) => {
        const type = decodeToken(req).ds_type        
        const body = req.body;       
        if(type != "vendedor"){
            return res.status(401).json({
                success:0,
                message: "Usuario sin permisos para subir producto"

            });            
        
        }
      
        uploadProduct(body, (err, results) => {
           
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
    getProductsByIdStore: (req, res) => {
        const id_store = req.params.id_store;
        
        getProductsByIdStore (id_store, (err, results) => {
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
    getProductsByFilters: (req, res) => {
        const body = req.body;
       
        getProductsByFilters (body, (err, results) => {
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
    getProductByIdProduct: (req, res) => {
        const id = req.params.id_product;
       
        getProductByIdProduct (id, (err, results) => {
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
    getProductsByCategory: (req, res) => {
        const id = 2;
       
        getProductsByCategory (id, (err, results) => {
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
    createDiscount: (req, res) => {
        const body = req.body;
        createDiscount(body, (err, results) => {
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
    getProductsWithDiscount: (req, res) => {
       
        getProductsWithDiscount ((err, results) => {
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
    
   recommendedProducts: (req, res) => {
        const body = req.body;
        const id_user = decodeToken(req).result.id_user 
        body.id_buyer = id_user
        console.log(body);  
        recommendedProducts(body, (err, results) => {
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
    //tabla categorias
    createProductCategory: (req, res) => {
        const body = req.body;
        const type = decodeToken(req).result.ds_type                      
        if(type != "administrador"){
            return res.status(401).json({
                success:0,
                message: "Usuario sin permisos para esta acción"

            });            
        
        }
        
        createProductCategory (body, (err, results) => {
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

    getProductsCategories: (req, res) => {        
        
        getProductsCategories ((err, results) => {
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
    updateProductCategory: (req, res) => {
        const body = req.body;
        const type = decodeToken(req).result.ds_type                      
        if(type != "administrador"){
            return res.status(401).json({
                success:0,
                message: "Usuario sin permisos para esta acción"

            });            
        
        }
        updateProductCategory(body, (err, results) => {
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