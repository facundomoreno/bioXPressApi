const { 
    createStore, 
    updateStore, 
    deleteStore, 
    getStores, 
    getStoresById 
} = require("../methods/Stores/store.controller");
const router = require("express").Router();
const {checkToken} = require('../../auth/TokenValidation');

const pool = require("../../config/database");


const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null, './public')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
      
    }
  });  
const upload = multer({storage});





//defino las rutas, su tipo y los métodos asociados

//router.post("/createStore", checkToken, createStore);
router.post("/updateStore", checkToken, updateStore);
router.patch("/deleteStore/:id_store", checkToken, deleteStore);
router.get("/getStores", checkToken, getStores);
router.get("/getStoresbyid/:id_store", checkToken, getStoresById);

router.post("/createStore", checkToken, upload.single("filee"), (req, res) => {
    pool.query(
        `INSERT INTO stores (store_name, ds_store, id_user, adress, store_pic) VALUES(?,?,?,?,?)`,
        [req.body.store_name, req.body.ds_store, req.body.id_user, req.body.adress,'http://localhost:3002/' + req.file.path],
        (error, results, fields) => {
          if (error) {
              return res.status(500).json({
                  success: 0,
                  message: error,
              });
          }
          
          return res.status(200).json({
              success: 1,
              data: results,
          });
        }
      );
    


});

router.post("/updateStorePic", upload.single("filee"), (req, res) => {

    pool.query(
      `UPDATE stores SET store_pic = ? WHERE id_store = ?`,
      ['http://localhost:3002/' + req.file.path, req.body.id_store],
      (error, results, fields) => {
        if (error) {
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
        
        return res.status(200).json({
            success: 1,
            data: results,
        });
      }
    );
  
  
  
  });  


module.exports = router;