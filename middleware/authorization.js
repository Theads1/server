const jwt = require("jsonwebtoken");
require("dotenv").config()

const authorization = async (req, res, next)=>{

    try {
        const jwtToken = req.header("token");

        //does it exist
        if (!jwtToken){
            return res.status(403).json("Not Authorized")
        }
    const payload = jwt.verify(jwtToken,process.env.jwtSecret);

    req.user = payload.user;

    next();
        
    } catch (error) {
        return res.status(403).json("Not Authorized")

    }
    //get token


    

};

module.exports = {authorization};