// const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const axios = require('axios');
const calculatePriority = require('../../utils/GetPriority');
const app = express();
const {body,validationResult} = require('express-validator');
const kafka = require('../../kafka/kafkaClient');
// import {sendNotification} from '../../../notif-service/producer';
// const sendNotification = require('../../../notif-service/producer');
// const sendEmail =   require('../../../notif-service/sendEmail');
const router = express.Router();

const Ticket = require('../../models/ticket.model');

const mongoose = require('mongoose');
const producer = kafka.producer();

producer.on('ready',()=>{
  console.log('Kafka Producer ready');
})

producer.on('errror',()=>{
  console.log('error in producer');
})


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
// const uri = "mongodb+srv://user:user@cluster0.ahh9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run();

router.post('/ticket/create',async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,description} = req.body;
    const ticket = new Ticket({name,description,status:'PENDING'});
    try{
       await ticket.save();

       await producer.send({
        topic: 'TOPIC', // Use the topic you created
        messages: [
            {
                key: 'ticket-created',
                value: JSON.stringify(ticket), // Send ticket details as value
            },
        ],
    });
    res.status(200).json({msg:'Saved successfully'});
  //   const emailContent = {
  //     to: 'recipient@example.com', // Replace with actual recipient email
  //     subject: 'New Ticket Created',
  //     text: `A new ticket has been created with details: ${JSON.stringify(ticket)}`,
  // };
  // await transporter.sendMail(emailContent);


    // await producer.disconnect();
    
    }
    catch(err){
      console.log(err);
        return res.status(500).json({msg:err})
    }
})

router.get('/ticket/get',async(req,res)=>{
  console.log('dsd');
  const tickets = await Ticket.find({});
  res.status(200).json({res:tickets});
})

module.exports = router;