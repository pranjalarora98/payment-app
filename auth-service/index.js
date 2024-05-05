// import signup from './routes/signup';
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
  await mongoose.connect('mongodb://0.0.0.0:27017');
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