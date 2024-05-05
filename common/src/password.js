const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(pswd){

    try{
     const salt = await bcrypt.genSalt(saltRounds);
     const hashedPswd = await bcrypt.hash(pswd,salt);
     return hashedPswd;
    }
    catch(err){
        return err;
    } 
}

async function comparePassword(hashpswd,pswd){

    try{
        const res = await bcrypt.compare(pswd,hashpswd);
     return res;
    }
    catch(err){
        return err;
    }

}

module.exports={hashPassword,comparePassword}