const {
     uploadProduct,    
     getProductsByIdStore,     
     updateProductCategory,
     createProductCategory,
     getProductsCategories,
     getProductsByFilters
    } = require('../methods/Products/products.controller');

const {checkToken} = require('../../auth/TokenValidation');
const router = require('express').Router();

//productos

router.post('/uploadProduct', checkToken, uploadProduct);
router.post('/getProductsByFilters', checkToken, getProductsByFilters);
router.get('/getProductsByIdStore/:id_store', checkToken, getProductsByIdStore);

//categorias
router.post('/createProductCategory', checkToken, createProductCategory);
router.patch('/updateProductCategory', checkToken, updateProductCategory);
router.get('/getProductCategories', checkToken, getProductsCategories);

module.exports = router;


