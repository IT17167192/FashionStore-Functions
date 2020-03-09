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

//update Category Using the ID
exports.updateById = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data);
    });
};

//Delete Category by ID
exports.removeById = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({
            message: "Category deleted"
        });
    });
};

//Get all categories
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data);

    });
};