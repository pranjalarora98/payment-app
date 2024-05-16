const express = require('express');

const User = require('../models/user.model');

router.get('/user/getAgents',async (req,res)=>{
      const agents = await User.find({type:'agent'});

      const agentData = await Promise.all(agents.map(async (agent)=>{
      const ticketCount = await Ticket.countDocuments({agent:agent._id});
       return {
        _id:agent.id,
        name:agent.name,
        email:agent.email,
        ticketCount,
       }
      }))

      return res.status(200).json(agentData);      
})