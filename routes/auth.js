const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');
const { getUserById } = require("../controllers/user");
//controller references
const { requiredSignin, isAuth, isAdmin, signup, newsletterSignUp, signin, signout } = require("../controllers/auth");

//routes
router.post("/signup", userSignupValidator, signup);
router.post("/newsletterSignUp", newsletterSignUp);
router.post("/signin", signin);
router.get("/signout", signout);

//create store manager route
router.post("/adminUser/create/:userId", requiredSignin, isAuth, isAdmin, userSignupValidator, signup);

//read by
router.param("userId", getUserById);

module.exports = router;