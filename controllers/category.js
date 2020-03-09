const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');

// Create Category
exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({data});
    });
};

// Get Category by ID
exports.getCategoryById = (req, res, next, id)  => {
    Category.findById(id).exec((err, cat) => {
        if(err || !cat){
            return res.status(400).json({
                error: "Not a Category!"
            });
        }

        req.category = cat;
        next();
    });
};

// Return Category from Request object
exports.readById = (req, res) => {
    return res.json(req.category);
};