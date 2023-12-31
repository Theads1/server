const jwt= require("jsonwebtoken");
require('dotenv').config();

function jwtGen(user_id){
    const payload = {
        user:user_id
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn:"3d"});
}
module.exports = jwtGen