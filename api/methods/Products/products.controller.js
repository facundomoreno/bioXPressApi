const {
    uploadProduct,
    getProductsByCategory,
    getProductsByIdStore,
    getProductsByTitleMatch,
    getProductsByPriceRange,
    getProductsByStockRange
} = require('./products.service');

module.exports = 
{
    uploadProduct: (req, res) => {
        const body = req.body;
        
        uploadProduct (body, (err, results) => {
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
        const id_category = req.params.id_category;
        
        getProductsByCategory (id_category, (err, results) => {
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

    getProductsByPriceRange: (req, res) => {
        const body = req.body;
        
        getProductsByPriceRange (body, (err, results) => {
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

    getProductsByStockRange: (req, res) => {
        const body = req.body;
        
        getProductsByStockRange (body, (err, results) => {
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
    getProductsByTitleMatch: (req, res) => {
        const body = req.body;
        
        getProductsByTitleMatch (body, (err, results) => {
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