const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            res.status(400).json({
               error: 'User not found!'
            });
        }

        req.profile = user;
        next();
    });
};