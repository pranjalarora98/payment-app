const express = require('express');
const axios = require('axios');
const app = express();
const {body,validationResult} = require('express-validator');
const router = express.Router();

const Ticket = require('../../models/ticket.model');

router.post('/ticket/create',async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,description} = req.body;
    const ticket = new Ticket({name,description,status:'PENDING'});
    try{
        await ticket.save();
         res.status(200).json({msg:'Created Successfully'});
        const agentTicketsList =  await axios.get('http:/user/getAgents');
        const agentWithFewestTickets = agentData.reduce((minAgent, currentAgent) => {
            return currentAgent.ticketCount < minAgent.ticketCount ? currentAgent : minAgent;
        });
        return res.status(200).json({ msg: 'Ticket created successfully and assigned to agent', agent: agentWithFewestTickets });
    }
    catch(err){
        return res.status(500).json({msg:err});
    }
})

module.exports = router;