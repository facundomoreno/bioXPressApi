const {
     uploadProduct,    
     getProductsByIdStore,     
     updateProductCategory,
     createProductCategory,
     getProductsCategories,
     getProductsByFilters
    } = require('../methods/Products/products.controller');

    const pool = require("../../config/database");

const {checkToken} = require('../../auth/TokenValidation');
const router = require('express').Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null, './images/productPics')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
      
    }
  });  
const upload = multer({storage});
const path = require('path');
  

//productos

//router.post('/uploadProduct', checkToken, uploadProduct);
router.post('/getProductsByFilters', checkToken, getProductsByFilters);
router.get('/getProductsByIdStore/:id_store', checkToken, getProductsByIdStore);

//categorias
router.post('/createProductCategory', checkToken, createProductCategory);
router.patch('/updateProductCategory', checkToken, updateProductCategory);
router.get('/getProductCategories', checkToken, getProductsCategories);

router.post("/uploadProduct", upload.single('filee'), (req, res) => {
           
    pool.query(
      `insert into products(price, title, ds_product, id_store, stock, id_category) values(?,?,?,?,?,?)`, 
      [                        
        req.body.price,
        req.body.title,
        req.body.ds_product,
        req.body.id_store,
        req.body.stock,
        req.body.id_category         
      ],
      (error, results, fields) => {
        if (error) {
            return res.status(500).json({
                success: 0,
                message: error,
            });;
        }
        console.log(results);
       
        insertId = results.insertId;
        var pathFixed = path.join(__dirname, '../../');
        console.log(pathFixed); 

        pool.query(
          `INSERT INTO product_pictures (path, original_name, size, date, id_product) values(?,?,?,?,?)`,
          [path.join(pathFixed, req.file.path), req.file.originalname, req.file.size, req.body.date, insertId],
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
      }
      
    ); 
  });
  

module.exports = router;


