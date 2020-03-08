const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');

//controller references
const { getUserById } = require("../controllers/user");
const { requiredSignin, isAuth, isAdmin } = require('../controllers/auth');


//routes
//get single user
router.get('/:userId', requiredSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

//get user id as parameter
router.param('userId', getUserById);

module.exports = router;