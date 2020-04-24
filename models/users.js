const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    product: [{
        type: ObjectId,
        ref: 'Product',
        required: false
    }],
    wishlist: [{
        type: ObjectId,
        ref: 'Product',
        required: false
    }],
    salt: String,
    role: {
        type: String,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
