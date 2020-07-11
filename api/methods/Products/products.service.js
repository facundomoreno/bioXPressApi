const pool = require("../../../config/database");


const path = require('path');

const baseQuery = `
SELECT p.*, c.ds_category,s.store_name, pic.path, pic.id_product AS id_product_pic 
FROM products p 
LEFT OUTER JOIN product_category c ON c.id_category = p.id_category 
LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product 
LEFT OUTER JOIN stores s ON s.id_store = p.id_store

`;
var insertId;

module.exports = {
  //tabla productos
  uploadProduct: (data, callback) => {    
    pool.query(
      `INSERT INTO products (price, title, ds_product, id_store, stock, id_category) values(?,?,?,?,?,?)`,
      [
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
        
        // insertId = results.insertId;

        // pool.query(
        //   `INSERT INTO product_pictures (path, original_name, size, date, id_product) values(?,?,?,?,?)`,
        //   ["http://fotos.com/foto.jpg", "el hombre", 500, "10/10/10", insertId],
        //   (error, results, fields) => {
        //     if (error) {
        //       return callback(error);
        //     }

        //     return callback(null, results);
        //   }
        // );
      }
    );
  },
  getProductsByIdStore: (id_store, callback) => {
    pool.query(
      `${baseQuery} p.id_store = ?`,
      [id_store],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getProductsByFilters: (data, callback) => {
    pool.query(
      `
            ${baseQuery}
             where LOWER(p.title) LIKE LOWER('%${data.title}%') AND
             (p.stock BETWEEN ${data.minS} AND ${data.maxS}) AND
             (p.price BETWEEN ${data.minP} AND ${data.maxP}) AND
              p.id_category = ${data.id_category}`,
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        
        return callback(null, results);
      }
    );
  },
  //categorias
  createProductCategory: (data, callback) => {
    pool.query(
      `INSERT INTO product_category (ds_category) values(?)`,
      [data.ds_category],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getProductsCategories: (callback) => {
    pool.query(`SELECT * FROM product_category`, (error, results, fields) => {
      if (error) {
        callback(error);
      }
      return callback(null, results);
    });
  },
  updateProductCategory: (data, callback) => {
    pool.query(
      `update product_category SET ds_category = ? where id_category=?`,
      [data.ds_category, data.id_category],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
