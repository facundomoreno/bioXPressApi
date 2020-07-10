const pool = require('../../../config/database')

module.exports = {
    uploadProduct: (data, callback) => {
        pool.query(`INSERT INTO products (price, title, ds_product, id_store, stock, id_category) values(?,?,?,?,?,?)`, [
               data.price,
               data.title,
               data.ds_product,
               data.id_store,
               data.stock,
               data.id_category
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },

    getProductsByIdStore: (id_store, callback) => {
        pool.query(
            `SELECT p.*, c.ds_category, pic.* 
             FROM products p
             LEFT OUTER JOIN product_category c ON c.id_category = p.id_category
             LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product
             where p.id_store = ?`, [id_store],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getProductsByCategory: (id_category, callback) => {
        pool.query(
            `SELECT p.*, c.ds_category, pic.* 
             FROM products p
             LEFT OUTER JOIN product_category c ON c.id_category = p.id_category
             LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product
             where p.id_category = ?`, [id_category],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getProductsByPriceRange: (data, callback) => {
        pool.query(
            `SELECT p.*, c.ds_category, pic.* 
             FROM products p
             LEFT OUTER JOIN product_category c ON c.id_category = p.id_category
             LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product
             where p.price BETWEEN ? AND ?`, [data.min, data.max],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getProductsByStockRange : (data, callback) => {
        pool.query(
            `SELECT p.*, c.ds_category, pic.* 
            FROM products p
            LEFT OUTER JOIN product_category c ON c.id_category = p.id_category
            LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product
            where p.stock BETWEEN ? AND ?`, [data.min, data.max],
            (error, results, fields) => {
                if(error)
                {
                    callback(error);
                }
                    return callback(null, results);
                
            } 

        );
    },
    getProductsByTitleMatch : (title, callback) => {
        pool.query(
            `SELECT p.*, c.ds_category, pic.* 
            FROM products p
            LEFT OUTER JOIN product_category c ON c.id_category = p.id_category
            LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product
            where p.title = ?`, [title],
            (error, results, fields) => {
                if(error)
                {
                    callback(error);
                }
                    return callback(null, results);
                
            } 

        );
    }



    
}