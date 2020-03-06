const express = require('express');
const router = express.Router();

//controller references
const { signup } = require("../controllers/user");

//routes
router.post("/signup", signup);

module.exports = router;