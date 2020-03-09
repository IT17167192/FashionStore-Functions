//userSignupValidator middleware implementation
exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty()
  req.check('email', 'Email must between 3 to 50 characters')
      .matches(/.+\@.+\..+/)
      .withMessage('Email must contain @')
      .isLength({
          min : 3,
          max : 50
      })
  req.check('password', 'Password is required').notEmpty()
  req.check('password')
      .isLength({
          min : 6
      })
      .withMessage('Password must contain at least 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number')

  const errors = req.validationErrors();

  if(errors){
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({error: firstError});
  }
  next();
};

exports.categoryValidator = (req, res, next) => {
    req.check('name', 'Category must be added!').notEmpty()
        .isLength({
            min: 1,
        })
        .withMessage('Category name cannot be empty')

    const catErr = req.validationErrors();

    if(catErr){
        const catNameError = catErr.map(catErr => catErr.msg)[0];
        return res.status(400).json({error: catNameError});
    }
    next();
};