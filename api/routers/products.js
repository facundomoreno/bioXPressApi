const {
     uploadProduct,
     getProductsByCategory, 
     getProductsByIdStore,
     getProductsByStockRange,
     getProductsByPriceRange,
     getProductsByTitleMatch
    } = require('../methods/Products/products.controller');

const {checkToken} = require('../../auth/TokenValidation');
const router = require('express').Router();

router.post('/uploadProduct', checkToken, uploadProduct);
router.post('/getProductsByStockRange', checkToken, getProductsByStockRange);
router.post('/getProductsByPriceRange', checkToken, getProductsByPriceRange);
router.get('/getProductsByTitleMatch', checkToken, getProductsByTitleMatch);
router.get('/getProductsByCategory/:id_category', checkToken, getProductsByCategory);
router.get('/getProductsByIdStore/:id_store', checkToken, getProductsByIdStore);

module.exports = router;


