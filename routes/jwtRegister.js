const router = require("express").Router();
const pool = require("../db.js");
const CryptoJS = require("crypto-js");
const jwtGen = require("../util/jwtAuth");
const {authorization} = require("../middleware/authorization.js")
router.get("/logintest", (req,res)=>{
    res.send("connection success");
})

//Register

router.post("/register",  async (req, res) =>{
    try {
        //username, email, password

        const {name, email, password}= req.body;
        

        //if exists, send error
        const user = await pool.query("SELECT * FROM users WHERE username=$1",[name]);
        if(user.rows.length !==0){
            return res.status(401).json("user already exists..");
        }

        //if not, hash password
        const hashword = await CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

        //enter new user
        const newUser = await pool.query(
            "INSERT into users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashword]
        );

        //start jwt token
        const token = jwtGen(newUser.rows[0].user_id);

        res.json({token});


        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//login

router.post("/login", async (req,res) => {
    try {
        //destructor req.body

        const {name, password} = req.body;

        //check if user doesn't exist, if not show error
        const users = await pool.query("SELECT * FROM users WHERE username = $1", [name]);

        if (users.rows.length === 0){
            return res.status(401).json("username or password incorrect");
        } 

        //decrypt and check if password matches username in database
        const hashwords=CryptoJS.AES.decrypt(users.rows[0].password, process.env.PASS_SEC);
        const deCryptpass = hashwords.toString(CryptoJS.enc.Utf8);

        
       if ( deCryptpass !== password){
        return res.status(401).send("username or password incorrect");
       } 
       


        //if yes, give jwt token

        const token = jwtGen(users.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})

//constantly verify token

router.get("/is-verify", authorization, async (req,res) =>{
    try{

        res.json(true);

    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})

//get all users

router.get("/users", async(req,res)=>{
    try {
       const getUsers = pool.query("SELECT * FROM users");
       res.status(200).json(getUsers)

    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})

router.get("/:id", async(req,res)=>{
    try {
        const {id} = req.body;
       const singleUser = pool.query("SELECT * FROM users WHERE user_id= $1", [id]);
       res.status(200).json(singleUser)

    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})

//delete user
router.delete("/:id", authorization, async (req,res) =>{
    try {
        const {id, name} = req.body;
         await pool.query("DELETE FROM users WHERE username = $1 RETURNING *", [name]);
        res.status(200).json("User Deleted")
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
}

)


// access private info

module.exports = router;