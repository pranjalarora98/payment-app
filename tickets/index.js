const mongoose = require('mongoose');

const CreateTicket = require('./src/routes/create-ticket');
// const kafka = require('kafka-node');

const express = require('express');
const bodyParser=require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(CreateTicket);


const connectDB = require('../database/db');

const startTicketService = async () => {
  try {
    await connectDB();
    // Start ticket service logic
  } catch (error) {
    console.error("Error starting ticket service:", error);
    process.exit(1);
  }
};

startTicketService();



app.listen(3003,()=>{
    console.log('Ticket service running');
})


// const uri = "mongodb+srv://pranjalarora98:biYPFJ3p9GMAxKnK@cluster0.2s4pv9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// const kafkaProducer = new kafka.Producer(new kafka.KafkaClient({kafkaHost:'localhost:9092'}));

const sendMessage = (message) => {

  const payload=[
    {topic:'test',message:JSON.stringify(message)}
  ]
  
  kafkaProducer.send(paylods,(err,data)=>{
    
  })

}

// kafkaProducer.on('ready',()=>{
//     console.log('kafka producer ready');
// })

// kafkaProducer.on('error',(err)=>{
//     console.log('error',err);
// })