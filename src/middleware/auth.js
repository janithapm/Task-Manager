const jwt = require('jsonwebtoken')
const User = require("../model/user")

const authenticate = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('bearer ','')

        const decoded = jwt.verify(token,'varsity')
        
        if(!decoded){
            throw new Error()
        }

        const user =await User.findOne({'_id':decoded._id,'tokens.token':token})
        req.user = user
        next()
    }
    catch(e){
        res.status(401).send({"error":"unauthorized operation"})
    }

}

module.exports = authenticate