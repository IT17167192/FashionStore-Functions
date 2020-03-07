const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');

//controller references
const { getUserById } = require("../controllers/user");
const { AuthMiddleware } = require('../controllers/auth');
//routes
router.get('/:userId', AuthMiddleware, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param('userId', getUserById)

module.exports = router;