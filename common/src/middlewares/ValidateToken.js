const jwt = require('jsonwebtoken');

const ValidateToken = (req,res,next) => {
   
    if(!req.headers.authorization)
        return res.status(401).send({msg:'Authorization header is empty'});    
    
    const token = req.headers.authorization.split(' ')[1];

   if(jwt.verify(token,process.env.AUTH_SECRET))
    next();
else
return res.status(500).send({msg:'Unauthorized token'});
}

module.exports = ValidateToken;