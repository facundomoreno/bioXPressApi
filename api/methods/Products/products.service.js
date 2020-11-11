const pool = require("../../../config/database");

const path = require("path");

const baseQuery = `
SELECT p.*, c.ds_category, s.store_name, s.store_pic, MIN(pic.path) as path, pic.id_product AS id_product_pic 
FROM products p 
LEFT OUTER JOIN product_category c ON c.id_category = p.id_category 
LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product 
LEFT OUTER JOIN stores s ON s.id_store = p.id_store
`;

const checkCategory = (id_category) => {
  if (typeof id_category === "undefined") {
    return "";
  } else {
    return `AND p.id_category = ${id_category}`;
  }
};

module.exports = {
  //tabla productos
  uploadProduct: (data, callback) => {
    pool.query(
      `INSERT INTO products (price, title, ds_product, id_store, stock, id_category, withdrawal, delivery) values(?,?,?,?,?,?,?,?)`,
      [
        data.price,
        data.title,
        data.ds_product,
        data.id_store,
        data.stock,
        data.id_category,
        withdrawal,
        delivery,
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
      `${baseQuery} WHERE p.id_store = ?
        GROUP BY p.id_product desc`,
      [id_store],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
              /*AND
             (p.stock BETWEEN ${data.minS} AND ${data.maxS}) AND
             (p.price BETWEEN ${data.minP} AND ${data.maxP}) 
             ${checkCategory(data.id_category)}
             LIMIT ${data.minProd}, ${data.maxProd}*/
  getProductsByFilters: (data, callback) => {
    pool.query(
      `      ${baseQuery}
             where LOWER(p.title) LIKE LOWER('%${data.title}%')
             GROUP BY p.id_product desc                      
             `,
      (error, results, fields) => {
        if (error) {
          callback(error);
        }

        return callback(null, results);
      }
    );
  },
  getProductByIdProduct: (id, callback) => {
    var resultsR = [];
    pool.query(
      `
            ${baseQuery}
             WHERE p.id_product = ?`,
      [id],
      (error, results1, fields) => {
        if (error) {
          callback(error);
        }
        resultsR.push(results1[0]);
        pool.query(
          `SELECT * FROM product_pictures
           WHERE id_product = ?`,
          [id],
          (error, results2, fields) => {
            if (error) {
              callback(error);
            }
            resultsR.push(results2);
            console.log(resultsR);
            return callback(null, resultsR);
          }
        );
      }
    );
  },
  getProductsByCategory: (id, callback) => {
    pool.query(
      `
            ${baseQuery}
             WHERE p.id_category = ?
             GROUP BY p.id_product desc
             `,
      [id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }

        return callback(null, results);
      }
    );
  },
  createDiscount: (data, callback) => {
    pool.query(
      `UPDATE products SET discount = ? WHERE id_product = ?`,
      [data.discount, data.id_product],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getProductsWithDiscount: (callback) => {
    pool.query(
      `
            ${baseQuery}
             WHERE p.discount > 0
             GROUP BY p.id_product desc
             `,
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
      `UPDATE product_category SET ds_category = ? WHERE id_category = ?`,
      [data.ds_category, data.id_category],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  recommendedProducts: (data, callback) => {
    pool.query(
      `SELECT p.id_category
      FROM cart_products cp
      LEFT OUTER JOIN cart car ON cp.id_cart = car.id_cart
      LEFT OUTER JOIN products p ON cp.id_product = p.id_product
      WHERE car.id_buyer = ? 
      ORDER BY car.date ASC LIMIT 2
      `,
      [data.id_buyer],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        var last_categories = [];

        for (var i = 0; i < results.length; i++) {
          last_categories.push([results[i].id_category]);
        }

        console.log(last_categories);

        if (last_categories.length < 1) {
          //agrega categoría vegana
          last_categories.push(2);
        }

        pool.query(
          `
        ${baseQuery}        
        WHERE p.id_category in (?)
        GROUP BY p.id_product desc
        `,
          [last_categories],

          (error, results, fields) => {
            if (error) {
              callback(error);
            }
            return callback(null, results);
          }
        );
      }
    );
  },
};
