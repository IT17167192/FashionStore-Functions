const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');

//controller references
const { signup, signin, signout } = require("../controllers/auth");

//routes
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;