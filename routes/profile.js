const router = require("express").Router();
const pool = require("../db.js");
const {authorization} = require("../middleware/authorization.js");

router.get("/profile", authorization, async(req,res)=>{
    try {
        const user = await pool.query("SELECT username FROM users WHERE user_id= $1", [req.user])
       res.json(user.rows[0]);
  
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})

module.exports = router