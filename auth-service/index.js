// import signup from './routes/signup';
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
console.log('AUTH_SECRET:', process.env.AUTH_SECRET);
const signup = require('./routes/signup');
const login = require('./routes/login');
const exportAgents = require('./routes/exportAgents');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(signup);
app.use(login);
app.use(exportAgents);

const uri = "mongodb://pranjalarora98:biYPFJ3p9GMAxKnK@ac-nvwe5on-shard-00-00.2s4pv9e.mongodb.net:27017,ac-nvwe5on-shard-00-01.2s4pv9e.mongodb.net:27017,ac-nvwe5on-shard-00-02.2s4pv9e.mongodb.net:27017/?ssl=true&replicaSet=atlas-ae9a7j-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error in connection to database:", err);
    });
    await mongoose.connect(uri, { dbName: "payment" });
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
};

connectDB();

 app.listen(3002,()=>{
     console.log('Server Running');
 })