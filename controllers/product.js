const formidable = require('formidable');
const lodash = require('lodash');
const Product = require('../models/product');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Product could not be found"
            });
        }

        req.product = product;
        next();
    });
};

exports.read = (req, res) => {
    req.product.image = undefined;
    return res.json(req.product);
};

// Create Product
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        // Check for all the variables
        const {name, description, category, price, currency, quantity, takeInMethod} = fields;

        // Validating the variables
        if(!name || !description || !category || !price || !currency || !quantity || !takeInMethod){
            return res.status(400).json({
                error: "Complete all fields!"
            });
        }

        let product = new Product(fields);

        // Image validation
        if(files.image){
            if(files.image.size > 5000000){
                return res.status(400).json({
                    error: "Image size is too large. Upload an image <5MB"
                });
            }
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        product.save((err, success) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(success);
        });
    });
};

// Delete Product
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, dlt) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ "message": 'Product deleted!' })
    });
};

// Update Product
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        // Check for all the variables
        const {name, description, category, price, currency, quantity, takeInMethod} = fields;

        // Validating the variables
        if(!name || !description || !category || !price || !currency || !quantity || !takeInMethod){
            return res.status(400).json({
                error: "Complete all fields!"
            });
        }

        // Accessing the existing product
        let product = req.product;

        // Replace existing Product info
        product = lodash.extend(product, fields);

        // Image validation
        if(files.image){
            if(files.image.size > 5000000){
                return res.status(400).json({
                    error: "Image size is too large. Upload an image <5MB"
                });
            }
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        product.save((err, success) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(success);
        });
    });
};