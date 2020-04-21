const express = require("express");
const router = express.Router();
const { requiredSignin, isAuth } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/braintree");

router.get("/braintree/getToken/:userId", requiredSignin, isAuth, generateToken);
router.post("/braintree/payment/:userId", requiredSignin, isAuth, processPayment);

router.param("userId", getUserById);

module.exports = router;