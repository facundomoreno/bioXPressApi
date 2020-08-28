const pool = require("../../../config/database");

const baseQuery = 
`SELECT pm.payment_method, u.username, u.dni, u.first_name, u.last_name, u.phone_number, ad.*, dl.*
FROM deliveries dl
LEFT OUTER JOIN payment_methods pm ON pm.id_pm = dl.id_pm
LEFT OUTER JOIN users u ON u.id_user = dl.id_buyer
LEFT OUTER JOIN adresses ad ON ad.id_user = dl.id_buyer`

module.exports = {   
    
    getCartProducts: (id_cart, callback) => {
        pool.query(`
        SELECT c.*, p.price, p.title, pic.id_pic, MIN(pic.path), cp.*, SUM(p.price)
        FROM cart_products cp
        LEFT OUTER JOIN products p ON cp.id_product = p.id_product
        LEFT OUTER JOIN cart c ON cp.id_cart = c.id_cart
        LEFT OUTER JOIN product_pictures pic ON pic.id_product = p.id_product
        WHERE cp.id_cart = ? GROUP BY cp.id_cart desc`,
        [id_cart], 
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    createCartWithProduct: (data, callback) => {
        pool.query(`INSERT INTO cart (id_buyer, date) values(?,?)`, 
            [
                data.id_buyer,
                data.date
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                id_cart = results.insertId
                pool.query(`INSERT INTO cart_products (id_product, quantity, id_cart) values(?,?,?)`, 
                [
                    data.id_product,
                    data.quantity,
                    id_cart
                ],
                (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                }
    
            );
            }

        );
    },

    createDelivery: (data, callback) => {
        pool.query(`INSERT INTO deliveries (id_pm, delivery_arrival, id_buyer, delivery_request, id_adress) values(?,?,?,?,?)`, 
            [
                data.id_pm,
                data.delivery_arrival,
                data.id_buyer,
                data.delivery_request,
                data.id_adress
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    deleteDelivery: (data, callback) => {
        pool.query(`UPDATE deliveries SET state = ? WHERE id_delivery = ?`,
            [
              data.state,
              data.id_delivery
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    
    updateDelivery: (data, callback) => {
        pool.query(`UPDATE deliveries SET id_pm = ?, delivery_arrival = ?, id_adress = ?, state = ? WHERE id_delivery = ?`,
            [
              data.id_pm,
              data.delivery_arrival,
              data.id_adress,
              data.state,
              data.id_delivery
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getDeliveryById: (id_delivery, callback) => {
        pool.query(`
        ${baseQuery}
        WHERE dl.id_delivery = ?`,
        [id_delivery], 
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },

    getDeliveriesByIdUser: (id_buyer ,callBack) => {
        pool.query(
            `${baseQuery}
             WHERE dl.id_buyer = ?`,
            [id_buyer],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllDeliveries: (data,callBack) => {
        pool.query(
            `${baseQuery}`, [data],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
    getCartForDelivery: (id_delivery, callback) => {
        pool.query(`
        SELECT p.*, c.*, s.store_name, SUM(p.price)
        FROM cart c
        LEFT OUTER JOIN products p ON c.id_product = p.id_product
        LEFT OUTER JOIN stores s ON p.id_store = s.id_stores   
        WHERE dl.id_delivery = ?`,
        [id_delivery], 
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },



}