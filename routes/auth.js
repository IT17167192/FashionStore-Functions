const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');
const { getUserById } = require("../controllers/user");
//controller references
const { requiredSignin, isAuth, isAdmin, signup, signin, signout, changeState } = require("../controllers/auth");

//routes
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//create store manager route
router.post("/adminUser/create/:userId", requiredSignin, isAuth, isAdmin, userSignupValidator, signup);

router.put('/adminUser/modify/:userId', requiredSignin, isAdmin, changeState);

//read by
router.param("userId", getUserById);

module.exports = router;
