const express = require('express');
const router = express.Router();
const { Addproduct, getAllproduct, getProductById, searchProducts, productUpdate, productdelete } = require('../controller/product.controller.js');
const auth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/admin.middleware');
const upload = require('../middleware/upload.middleware');

// add product (admin only) - with image upload
router.post('/addproduct', auth, isAdmin, upload.single('image'), Addproduct);
// get all products
router.get('/',getAllproduct)
// search products
router.get('/search', searchProducts)
// get product by id
router.get('/getproduct/:id',getProductById)
// update product by id - with optional image upload
router.put('/updateproduct/:id', auth, isAdmin, upload.single('image'), productUpdate)
// delete product by id
router.delete('/deleteproduct/:id', auth, isAdmin, productdelete)

module.exports = router;