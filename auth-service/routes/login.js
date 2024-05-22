const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {comparePassword} = require('../../common/src/password');

router.post('/user/login',async (req,res)=>{
    
    const {email,password} = req.body;
    const user = await User.findOne({email}); 
    console.log(user);
    if(!user){
        return res.status(400).json({msg:'Invalid credentials'});
    }
    const res1 = await comparePassword(user.password,password);
    console.log(res1);
    if(!res1){
        return res.status(400).json({msg:'passwords dont match'});
    } 
    const token = jwt.sign({userId:123},process.env.AUTH_SECRET,{expiresIn: '1h'});

   return res.status(200).json({msg:'Login successsfully',token,res1});
})

module.exports = router;