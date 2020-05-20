const User = require('../models/users');

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

//method to remove cart products
exports.removeItemById = (req, res) => {
    User.updateOne(
        {_id: req.profile._id},
        {$pull: {product: req.body._id}}, //remove item by product id
        {safe: true, multi: true}, //safe callbacks errors, update multiple docs

        function (err) {
            //if error send error or success
            if (err) return res.send(500, {error: err});
            return res.send(200, {success: 'Successfully Removed.'});
        })
};

exports.removeWishListItem = (req, res) => {
    User.updateOne(
        {_id: req.profile._id},
        {$pull: {wishlist: req.body._id}},
        {safe: true, multi: true},

        function (err) {
            if (err) return res.send(500, {error: err});
            return res.send(200, {success: 'Successfully Removed.'});
        })
};

//function read user details
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);   //get entire profile
};

//function to read address of the user
exports.address = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    //get only needed info
    return res.json({
        address1: req.profile.address1,
        address2: req.profile.address2,
        town: req.profile.town,
        postal_code: req.profile.postal_code,
        mobile: req.profile.mobile
    });
};

//method to update users using requests
exports.update = (req, res) => {
    let updateSet = {$set: {}, $addToSet: {}};  //add to set used to not to replace existing cart items

    if (req.body.name != null) {
        updateSet.$set.name = req.body.name //update name
    }
    if (req.body.password != null) {
        updateSet.$set.password = req.body.password //update password
    }
    if (req.body.email != null) {
        updateSet.$set.email = req.body.email   //update email
    }
    if (req.body.address1 != null) {
        //update address details
        updateSet.$set.address1 = req.body.address1;
        updateSet.$set.address2 = req.body.address2;
        updateSet.$set.town = req.body.town;
        updateSet.$set.postal_code = req.body.postal_code;
        updateSet.$set.mobile = req.body.mobile;
    }
    //adding products to the shopping cart
    if (req.body.product != null) {
        updateSet.$addToSet.product = req.body.product  //update cart products
    }

    //update user doc using user id
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

exports.updateWishList = (req, res) => {
    let updateSet = {$addToSet: {}};  //add to set used to not to replace existing wishlist items

    if (req.body.product != null) {
        updateSet.$addToSet.wishlist = req.body.product
    }

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
