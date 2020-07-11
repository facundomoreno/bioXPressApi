const {
    uploadProduct,   
    getProductsByIdStore,    
    getProductsByFilters,
    createProductCategory,
    updateProductCategory,
    getProductsCategories,
    
} = require('./products.service');



module.exports = 
{
    uploadProduct: (req, res) => {
        const body = req.body;
        console.log(req.file);
      
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

    //tabla categorias
    createProductCategory: (req, res) => {
        const body = req.body;
        
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