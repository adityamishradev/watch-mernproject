const express = require('express');
const router = express.Router();
const { Addproduct, getAllproduct, getProductById, productUpdate, productdelete } = require('../controller/product.controller.js');
const auth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/admin.middleware');

// add product (admin only)
router.post('/addproduct', auth, isAdmin, Addproduct);
// get product
router.get('/',getAllproduct)
// get product by id
router.get('/getproduct/:id',getProductById)
// update product by id
router.put('/updateproduct/:id', auth, isAdmin, productUpdate)
// delete product by id
router.delete('/deleteproduct/:id', auth, isAdmin, productdelete)

module.exports = router;