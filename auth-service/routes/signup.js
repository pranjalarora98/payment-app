// const config = require('config');
require("dotenv").config();
const express = require('express');
const {body, validationResult} =require('express-validator');
const {hashPassword} = require('../../common/src/password');
const ValidateRequest =  require('../../common/src/middlewares/ValidateRequest');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user.model');
const secret = 'abc123def456ghi789';

// const app = express();

console.log('dffdd',process.env.AUTH_SECRET);


router.post('/user/signup',[body('email').isEmail().withMessage('Email must be valid'),body('password').trim().isLength({min:4,max:10}).withMessage('password must be of length')],ValidateRequest,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password,type} = req.body;
    const user =await User.findOne({email});
    console.log(user);
    if(user)
    return res.status(500).json({error:'User already exists'});

    const hashedPswd =await hashPassword(password);
    const newUser = new User({email,password:hashedPswd,type});

    await newUser.save();
    const token = jwt.sign({userId:123},process.env.AUTH_SECRET,{expiresIn: '1h'});
    res.status(200).json({msg:'Created successfully',token});

})

module.exports = router;

// app.use(router);

// app.listen(3002,()=>{
//     console.log('Server Running');
// })