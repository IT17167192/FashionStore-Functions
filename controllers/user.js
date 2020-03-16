const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).populate('product').exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: 'User not found!'
            });
        }

        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
};

exports.update = (req, res) => {
    let updateSet = {$set: {}, $addToSet: {}};

    if (req.body.name != null) {
        updateSet.$set.name = req.body.name
    }
    if (req.body.password != null) {
        updateSet.$set.password = req.body.password
    }
    if (req.body.email != null) {
        updateSet.$set.email = req.body.email
    }

    console.log(updateSet);
    User.findOneAndUpdate({_id: req.profile._id}, updateSet, {new: true}, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'Unauthorized Action!'
            })
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.json(user);
    });
};
