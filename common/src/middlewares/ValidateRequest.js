const {validationResult} = require('express-validator');

const ValidateRequest = (req,res,next)=> {
    const errors = validationResult(req);
    if(errors.length){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}

module.exports = ValidateRequest