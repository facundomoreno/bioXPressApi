const { createUser, login } = require("../methods/Users/user.controller");
const router = require("express").Router();
require("dotenv").config();

const pool = require("../../config/database");
const { checkToken, decodeToken} = require("../../auth/TokenValidation");
const path = require("path");
const multer = require("multer");
const { route } = require("./products");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter(req, file, cb) {
    if (file != null) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
        cb(new Error("Error: Unacceptable file format"), false);
      } else {
        cb(null, true);
      }
    } else {
      cb(null, true);
    }
  },
});








//defino las rutas, su tipo y los métodos asociados

router.post("/createUser", upload.single("filee"), (req, res) => {
    var filepath = '';
    if(req.file)
    {
        filepath = process.env.SERVER_IP + req.file.path
    }
    pool.query(
        `INSERT INTO users (username, password, profile_pic, id_type, first_name, last_name, dni) values(?,?,?,?,?,?,?)`,
        [
            req.username,
            req.password,
            filepath,               
            req.id_type,
            req.first_name,
            req.last_name,
            req.dni
        ],
        (error, results, fields) => {
          if (error) {
            return res.status(500).json({
              success: 0,
              message: error,
            });
          }
          else{
          return res.status(200).json({
              success: 1,
              message: results
          });
        }
    });    
});
router.post("/login", login);

router.post("/updateUserPic", checkToken, upload.single("filee"), (req, res) => {

    const id_user =  decodeToken(req).result.id_user

    pool.query(
        `UPDATE users set profile_pic = ? WHERE id_user = ?`,
        [            
            process.env.SERVER_IP + req.file.path,
            id_user          
            
        ],
        (error, results, fields) => {
          if (error) {
            return res.status(500).json({
              success: 0,
              message: error,
            });
          }
          else{
          return res.status(200).json({
              success: 1,
              message: results
          });
        }
    });   


});

module.exports = router;