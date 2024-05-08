const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {comparePassword} = require('../../common/src/password');

router.post('/user/login',async (req,res)=>{
    
    const {email,password} = req.body;
    const user = User.findOne({email}); 
    if(!user){
        return res.status(400).json({msg:'Invalid credentials'});
    }
    const res1 = await comparePassword(user.password,password);
    console.log(res1);
    if(!res1){
        return res.status(400).json({msg:'passwords dont match'});
    } 

   return res.status(200).json({msg:'Login successsfully'});
})

module.exports = router;