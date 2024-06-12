const express = require('express');
const axios = require('axios');
const calculatePriority = require('../../utils/GetPriority');
const app = express();
const {body,validationResult} = require('express-validator');
// import {sendNotification} from '../../../notif-service/producer';
const sendNotification = require('../../../notif-service/producer');
// const sendEmail =   require('../../../notif-service/sendEmail');
const router = express.Router();

const Ticket = require('../../models/ticket.model');

router.post('/ticket/create',async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,description} = req.body;
    // const ticket = new Ticket({name,description,status:'PENDING'});
     
    // const response =  await axios.get('http:://localhost:3002/user/getAgents');
    // const agentTicketsList = response.data;
    sendNotification({topic:'bnbnbnbnbnnb'});
    // sendEmail('ddfd','dfdfd');
    // console.log(agentTicketsList);
        return res.status(200).json({msg:'agentTicketsList'});

        
//     try{
//         await ticket.save();
//          res.status(200).json({msg:'Created Successfully'});
//          try{
//         const agentTicketsList =  await axios.get('http://payment-auth-srv:3002/user/getAgents');
//         return res.status(200).send({msg:agentTicketsList});
//          }
//          catch(err){
// console.log(err);
//          }
//         const agentWithFewestTickets = agentData.reduce((minAgent, currentAgent) => {
//             return currentAgent.ticketCount < minAgent.ticketCount ? currentAgent : minAgent;
//         });
//         return res.status(200).json({ msg: 'Ticket created successfully and assigned to agent', agent: agentWithFewestTickets });
//     }
//     catch(err){
//         return res.status(500).json({msg:err});
//     }
})

module.exports = router;