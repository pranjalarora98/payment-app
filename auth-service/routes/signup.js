const express = require('express');

const router = express.Router();

const app = express();


router.post('/user/signup',(req,res)=>{
    res.send('Hello World');
})


app.use(router);

app.listen(3002,()=>{
    console.log('Server Running');
})