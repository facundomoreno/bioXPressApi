const pool = require('../../../config/database');
const { query } = require('express');

const baseQuery = 
`
SELECT p.*, c.ds_category,s.store_name, pic.path, pic.id_product AS id_product_pic 
FROM products p 
LEFT OUTER JOIN product_category c ON c.id_category = p.id_category 
LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product 
LEFT OUTER JOIN stores s ON s.id_store = p.id_store
where
`

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
            `${baseQuery} p.id_store = ?`, [id_store],
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
            `${baseQuery} p.id_category = ?`, [id_category],
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
            `${baseQuery} p.price BETWEEN ? AND ?`, [data.min, data.max],
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
            `${baseQuery} p.stock BETWEEN ? AND ?`, [data.min, data.max],
            (error, results, fields) => {
                if(error)
                {
                    callback(error);
                }
                    return callback(null, results);
                
            } 

        );
    },
    getProductsByTitleMatch : (data, callback) => {
        pool.query(
            `${baseQuery} LOWER(p.title) LIKE LOWER('%${data.title}%')`,
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