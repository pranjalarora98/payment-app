const express = require('express');
const {body} =require('express-validator');
const ValidateRequest =  require('../../common/src/middlewares/ValidateRequest');
const router = express.Router();

// const app = express();


router.post('/user/signup',[body('email').isEmail().withMessage('Email must be valid'),body('password').trim().isLength({min:4,max:10}).withMessage('password must be of length')],ValidateRequest,(req,res)=>{
    res.send('Hello World');
})

module.exports = router;

// app.use(router);

// app.listen(3002,()=>{
//     console.log('Server Running');
// })