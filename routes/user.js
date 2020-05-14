const express = require('express');
const router = express.Router();

//controller references
const { getUserById, read, update, removeItemById, removeWishListItem, updateWishList } = require("../controllers/user");
const { requiredSignin, isAuth, isStoreManager } = require('../controllers/auth');


//routes
//get single user
//admin middleware to authenticate admins
//isStoreManager middleware to authenticate storeManager. Also admins have access to those routes
router.get('/secret/:userId', requiredSignin, isAuth, isStoreManager, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requiredSignin, isAuth, read);
router.put('/user/:userId', requiredSignin, isAuth, update);
router.put('/wishlist/:userId', requiredSignin, isAuth, updateWishList);
router.post('/cart/remove/:userId', requiredSignin, isAuth, removeItemById);
router.post('/wishlist/remove/:userId', requiredSignin, isAuth, removeWishListItem);

//get user id as parameter
router.param('userId', getUserById);

module.exports = router;
