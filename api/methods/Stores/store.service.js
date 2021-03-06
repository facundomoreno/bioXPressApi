const pool = require("../../../config/database");

module.exports = {
    
    createStore: (data, callback) => {
        pool.query(`UPDATE users SET dni = ?, phone_number = ?, id_type = 2 WHERE id_user = ?` [
            data.dni,
            data.phone_number,
            data.id_user
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            pool.query(`INSERT INTO stores (store_name, ds_Store, id_user, store_pic)`, 
            [
                data.store_name,
                data.ds_store,
                data.id_user,
                data.store_pic
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                id_store = results.insertId;

                    pool.query(`INSERT INTO adresses (provincia, localidad, cp, calle, piso, numero, id_store)`, 
                [
                    data.provincia,
                    data.localidad,
                    data.cp,
                    data.calle,
                    data.piso,
                    data.numero,
                    id_store
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
        }

    );

        /*pool.query(`INSERT INTO stores (store_name, ds_Store, id_user, store_pic)`, 
            [
                data.store_name,
                data.ds_store,
                data.id_user,
                data.store_pic,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                id_store = results.insertId;

                    pool.query(`INSERT INTO adresses (provincia, localidad, cp, calle, piso, numero, id_store)`, 
                [
                    data.provincia,
                    data.localidad,
                    data.cp,
                    data.calle,
                    data.piso,
                    data.numero,
                    id_store,
                ],
                (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                }

        );
            }

        );*/
    },

    updateStore: (data, callback) => {
        pool.query(`UPDATE stores SET store_name = ?, ds_store = ?, id_user = ?, store_pic = ? WHERE id_store` [
                data.store_name,
                data.ds_store,
                data.id_user,
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
        pool.query(`UPDATE stores SET deleted = 1 WHERE id_store = ?`
             [id_store],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getStores: (data, callback) => {
        pool.query(`
        SELECT s.*, u.first_name, u.last_name
        FROM stores s
        LEFT OUTER JOIN users u ON u.id_user = s.id_user 
        WHERE LOWER(s.store_name) LIKE LOWER ('%${data.store_name}%')
        `, 
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },

    

    getStoresById: (id_store ,callBack) => {
        pool.query(
            `SELECT s.*, u.first_name, u.last_name, u.profile_pic, u.email, u.phone_number, a.* 
             FROM stores s 
             LEFT OUTER JOIN users u ON u.id_user = s.id_user
             LEFT OUTER JOIN adresses a ON a.id_store = s.id_store
             WHERE s.id_store = ?`,
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