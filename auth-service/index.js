// import signup from './routes/signup';
require('dotenv').config();
const signup = require('./routes/signup');
const login = require('./routes/login');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(signup);
app.use(login);

  async function func() {
  try{
  await mongoose.connect('mongodb://auth-mongo-payment-srv:27017/auth');
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