const {authorization} = require("../middleware/authorization.js");
const pool = require("../db.js");

const router = require("express").Router();
router.post("/order", authorization, async (req, res) => {

    try {
        const { uid, pid, quantity, amount, address, status} = req.body;
        const newOrder = await pool.query(
            "INSERT into products (user_id , product_id, quantity, amount, address, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
             [ uid, pid, quantity, amount, address, status ])

    res.json(newOrder);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

router.put("/:id", authorization, async (req,res) =>{
    try {
        const {pid, id, quantity} = req.params;
         const updatedCart=await pool.query("UPDATE order SET product_id = $1, product_quantity =$2 WHERE order_id = $3", [pid, quantity, id]);

        res.status(200).json(updatedCart)
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})

router.get("/userorders", async (req, res) => {

    try {
        const {id} = req.body;
         const orders = await pool.query("SELECT * FROM order WHERE user_id = $1, ", [id]);
        res.status(200).json(orders)
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})
module.exports = router;