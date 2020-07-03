const pool = require("../../../config/database");

module.exports = {
    createUser: (data, callback) => {
        pool.query(`INSERT INTO users (username, password, profile_pic, adress, id_type, first_name, last_name, dni) values(?,?,?,?,?,?,?,?)`, [
                data.username,
                data.password,
                data.profile_pic,
                data.adress,
                data.id_type,
                data.first_name,
                data.last_name,
                data.dni
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },

    getUserByUsername: (username, callBack) => {
        pool.query(
            `SELECT u.username, u.password, ut.ds_type
             FROM users u
             LEFT OUTER JOIN user_type ut ON ut.id_type = u.id_type
             where u.username = ?`, [username],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }

}