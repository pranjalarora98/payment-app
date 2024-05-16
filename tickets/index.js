const CreateTicket = require('./src/routes/create-ticket');
const kafka = require('kafka-node');

const express = require('express');
const bodyParser=require('body-parser');
const app = express();
app.use(bodyParser);
app.use(CreateTicket);

app.listen(3003,()=>{
    console.log('Ticket service running');
})


const kafkaProducer = new kafka.Producer(new kafka.KafkaClient({kafkaHost:'localhost:9092'}));

const sendMessage = (message) => {

  const payload=[
    {topic:'test',message:JSON.stringify(message)}
  ]
  
  kafkaProducer.send(paylods,(err,data)=>{
    
  })

}

kafkaProducer.on('ready',()=>{
    console.log('kafka producer ready');
})

kafkaProducer.on('error',(err)=>{
    console.log('error',err);
})