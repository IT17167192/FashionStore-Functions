const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');

//controller references
const { getUserById } = require("../controllers/user");
const { requiredSignin, isAuth, isAdmin, isStoreManager } = require('../controllers/auth');


//routes
//get single user
//admin middleware to authenticate admins
//isStoreManager middleware to authenticate storeManager. Also admins have access to those routes
router.get('/:userId', requiredSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

//get user id as parameter
router.param('userId', getUserById);

module.exports = router;