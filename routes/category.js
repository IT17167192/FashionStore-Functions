const express = require('express');
const router = express.Router();
const {categoryValidator} = require('../validators');

//controller references
const { create, getCategoryById, readById, updateById, removeById, list } = require("../controllers/category");
const { requiredSignin, isAuth, isAdmin, isStoreManager } = require('../controllers/auth');
const { getUserById } = require("../controllers/user");

//routes
router.post("/category/create/:userId", requiredSignin, categoryValidator, isAuth, isAdmin, isStoreManager, create);
router.get("/category/:categoryId", readById);
router.put("/category/:categoryId/:userId", requiredSignin, categoryValidator, isAuth, isAdmin, updateById);
router.delete("/category/:categoryId/:userId", requiredSignin, categoryValidator, isAuth, isAdmin, removeById);
router.get("/categories", list);


router.param('userId', getUserById);// Whenever userId is called, getUserById executes
router.param('categoryId', getCategoryById);// Whenever categoryId is called, getCategoryById executes
module.exports = router;