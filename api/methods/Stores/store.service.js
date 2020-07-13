const pool = require("../../../config/database");

module.exports = {
    createStore: (data, callback) => {
        pool.query(`INSERT INTO stores (store_name, ds_store, id_user, adress) values(?,?,?,?)`, [
                data.store_name,
                data.ds_store,
                data.id_user,
                data.adress
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },

    updateStore: (data, callback) => {
        pool.query(`UPDATE stores SET store_name = ?, ds_store = ?, id_user = ?, adress = ?, store_pic = ? WHERE id_store` [
                data.store_name,
                data.ds_store,
                data.id_user,
                data.adress,
                data.store_pic,
                data.id_store
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    deleteStore: (id_store, callback) => {
        pool.query(`UPDATE stores SET deleted = 1 WHERE id_store`
             [id_store],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getStores: (callBack) => {
        pool.query(
            `SELECT s.*, u.first_name, u.last_name
             FROM stores s
             LEFT OUTER JOIN users u ON u.id_user = s.id_user
             `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getStoresById: (id_store ,callBack) => {
        pool.query(
            `SELECT * FROM stores WHERE id_store = ?`,
            [id_store],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

}