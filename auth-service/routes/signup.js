const express = require('express');
const {body, validationResult} =require('express-validator');
const {hashPassword} = require('../../common/src/password');
const ValidateRequest =  require('../../common/src/middlewares/ValidateRequest');
const router = express.Router();

const User = require('../models/user.model');

// const app = express();


router.post('/user/signup',[body('email').isEmail().withMessage('Email must be valid'),body('password').trim().isLength({min:4,max:10}).withMessage('password must be of length')],ValidateRequest,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    console.log(req.body);
    const {email,password} = req.body;
    const user =await User.findOne({email});
    if(user)
    return res.status(500).json({error:'User already exists'});
    const hashedPswd =await hashPassword(password);
    const newUser = new User({email,password:hashedPswd});
    await newUser.save();
    res.status(200).json({msg:'Created successfully'});

})

module.exports = router;

// app.use(router);

// app.listen(3002,()=>{
//     console.log('Server Running');
// })