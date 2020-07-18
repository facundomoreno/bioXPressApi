const pool = require("../../../config/database");

const baseQuery = 
`SELECT pm.payment_method, u.username, u.dni, u.first_name, u.last_name, u.phone_number, ad.*, dl.*
FROM deliveries dl
LEFT OUTER JOIN payment_methods pm ON dl.id_pm = pm.id_pm
LEFT OUTER JOIN users u ON dl.id_buyer = u.id_user
LEFT OUTER JOIN adresses ad ON dl.id_adress = ad.id_adress`

module.exports = {   

    createDelivery: (data, callback) => {
        pool.query(`INSERT INTO deliveries (id_pm, delivery_arrival, id_buyer, delivery_request, id_adress) values(?,?,?,?,?)` [
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
        pool.query(`UPDATE deliveries SET state = ? WHERE id_delivery = ?`
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
        pool.query(`UPDATE deliveries SET id_pm = ?, delivery_arrival = ?, id_adress = ?, state = ? WHERE id_delivery = ?`
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

    getAllDeliveries: (callBack) => {
        pool.query(
            `${baseQuery}`,
              [data],
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