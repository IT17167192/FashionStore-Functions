const User = require("../models/user");
const jwt = require('jsonwebtoken');//token generation
const expressJwt = require('express-jwt');//auth check
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    console.log('req.body', req.body)
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({err: errorHandler(err)});
        }
        user.salt = undefined;
        user.hash_password = undefined;
        res.json({
           user
        });

    });
};

exports.signin = (req, res) => {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({error: 'User does not exist!'});
        }
        //authenticate the user
        if(!user.auth(password)){
            return res.status(401).json({
                error: 'Incorrect credentials!'
            });
        }
        //if authenticated generate a token with uid and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        //add to cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});
        //return user and token to the front-end client
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});
    })
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.status(200).json({message: 'Signout success!'})
};

//signin check middleware
exports.requiredSignin = expressJwt({secret: process.env.JWT_SECRET, userProperty: "auth"});

//authentication middleware
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access denied"
        });
    }

    next();
};

//admin routes authentication middleware
exports.isAdmin = (req, res, next) => {
    console.log(req.profile.role === "0");
    if(req.profile.role === "0"){
        return res.status(403).json({
            error: "Not a admin. Access denied!"
        });
    }

    next();
};