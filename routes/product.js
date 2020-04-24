const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');

//controller references
const { create, getProductById, read, remove, update, addRating
    , getAllProducts, getSimilarProduct, getProductCategories, getProductListBySearch, getImage } = require("../controllers/product");
const { requiredSignin, isAuth, isAdmin, isStoreManager } = require('../controllers/auth');
const { getUserById } = require("../controllers/user");

//routes
router.get("/product/:productId", read); // Read Product - get request
router.post("/product/create/:userId", requiredSignin, isAuth, isStoreManager, create); // Create Product - post request
router.delete('/product/:productId/:userId', requiredSignin, isAuth, isAdmin, remove); // Delete Product - delete request
router.put('/product/:productId/:userId', requiredSignin, isAuth, isStoreManager, update); // Update Product - put request
router.put('/product/addRating/:productId/:userId', requiredSignin, isAuth, addRating); // add Rating to a product - put request

//search routes
router.get('/products', getAllProducts);
router.get('/products/similar/:productId', getSimilarProduct);
router.get('/products/categories', getProductCategories);
router.post("/products/by/search", getProductListBySearch);
router.get('/product/image/:productId', getImage);


//read by
router.param("userId", getUserById);
router.param("productId", getProductById);



module.exports = router;