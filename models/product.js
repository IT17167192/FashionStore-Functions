const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    description: {
        type: String,
        required: true,
        maxLength: 5000
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxLength: 32
    },
    currency: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    takeInMethod: {
        required: false,
        type: Boolean
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);