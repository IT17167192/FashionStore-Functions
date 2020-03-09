const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');

//controller references
const { create, getProductById, read, remove, update } = require("../controllers/product");
const { requiredSignin, isAuth, isAdmin, isStoreManager } = require('../controllers/auth');
const { getUserById } = require("../controllers/user");

//routes
router.get("/product/:productId", read); // Read Product - get request
router.post("/product/create:userId", requiredSignin, isAuth, isAdmin, create); // Create Product - post request
router.delete('/product/:productId/:userId', requiredSignin, isAuth, isAdmin, remove); // Delete Product - delete request
router.put('/product/:productId/:userId', requiredSignin, isAuth, isAdmin, update); // Update Product - put request

//read by
router.param("userId", getUserById);
router.param("productId", getProductById);

module.exports = router;