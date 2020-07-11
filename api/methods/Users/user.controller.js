const { createUser, getUserByUsername } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {

    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
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

    login: (req, res) => {
        const body = req.body;
        getUserByUsername(body.username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Contraseña o nombre de usuario incorrecto."
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JSONTOKEN_KEY, {
                    expiresIn: "24h"
                });
                return res.json({
                    success: 1,
                    message: "login realizado con éxito",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Contraseña o nombre de usuario incorrecto."
                });
            }
        });
    }
}