// import signup from './routes/signup';
const signup = require('./routes/signup');
const mongoose = require('mongoose');

const express = require('express');

const app = express();
app.use(signup);

  async function func() {
  try{
  await mongoose.connect('mongodb://localhost/thenDBname');
  console.log('connected to mongo');
  }
  catch(err){
    console.log(err);
  }
}

func();

 app.listen(3002,()=>{
     console.log('Server Running');
 })