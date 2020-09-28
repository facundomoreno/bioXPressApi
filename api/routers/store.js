const { 
    createStore, 
    updateStore, 
    deleteStore, 
    getStores, 
    getStoresById 
} = require("../methods/Stores/store.controller");
const router = require("express").Router();
const {checkToken, decodeToken} = require('../../auth/TokenValidation');

const pool = require("../../config/database");

const path = require("path");
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null, './public')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
      
    }
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

//router.post("/createStore", checkToken, createStore);
router.post("/updateStore", checkToken, updateStore);
router.patch("/deleteStore/:id_store", checkToken, deleteStore);
router.post("/getStores", checkToken, getStores);
router.get("/getStoresbyid/:id_store", checkToken, getStoresById);

router.post("/createStore", checkToken, upload.single("filee"), (req, res) => {

  const id_user = decodeToken(req).result.id_user;

  if(decodeToken(req).result.ds_type != "vendedor")
  {
    return res.status(401).json({
      success: 0,
      message: "Usuario sin permisos",
  });

  }
  
    pool.query(
        `INSERT INTO stores (store_name, ds_store, id_user, store_pic) VALUES(?,?,?,?)`,
        [req.body.store_name, req.body.ds_store, id_user, req.file.path],
        (error, results, fields) => {
          if (error) {
              return res.status(500).json({
                  success: 0,
                  message: error,
              });
          }
                id_store = results.insertId;

                  pool.query(`INSERT INTO adresses (provincia, localidad, cp, calle, piso, numero, id_store) VALUES(?,?,?,?,?,?,?)`, 
                [
                    req.body.provincia,
                    req.body.localidad,
                    req.body.cp,
                    req.body.calle,
                    req.body.piso,
                    req.body.numero,
                    id_store,
                ],

                (error, results, fields) => {
                  if (error) {
                      return res.status(500).json({
                          success: 0,
                          message: error,
                      });
                  }
                    return res.status(200).json({
                      success: 1,
                      data: results
                    });
                }
          
          );
        }
      );
    


});

router.post("/updateStorePic", upload.single("filee"), (req, res) => {
  const type = decodeToken(req).result.ds_type                      
  if(type != "vendedor"){
      return res.status(401).json({
          success:0,
          message: "Usuario sin permisos para esta acción"

      });            
  
  }

    pool.query(
      `UPDATE stores SET store_pic = ? WHERE id_store = ?`,
      [req.file.path, req.body.id_store],
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