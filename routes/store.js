const express = require('express')
const router = express.Router()

const {
    getAllProducts,
    getSingleProduct,
    createproduct,
    updateProduct,
    deleteProduct} = require('../products/storeController')
    
    router.post('/create',createproduct);
    router.get('/product',getAllProducts);
    router.get('/product:id',getSingleProduct);
    router.delete('/delete:id',deleteProduct);
    router.put('/update',updateProduct);


    module.exports = router