const {authorization} = require("../middleware/authorization.js");
const pool = require("../db.js");


const router = require("express").Router();
//update cart
router.put("/:id", authorization, async (req,res) =>{
    try {
        const {pid, id, quantity} = req.params;
         const updatedCart = await pool.query("UPDATE carts SET product_id = $1, product_quantity =$2 WHERE cart_id = $3", [pid, quantity, id]);

        res.status(200).json(updatedCart)
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
})

//delete cart
router.delete("/:id",authorization, async (req,res) =>{
    try {
        const {id} = req.body;
         await pool.query("DELETE FROM carts WHERE cart_id = $1 RETURNING *", [id]);
        res.status(200).json("Cart Deleted")
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
}

)

//get cart
router.get("/find/:userId", async (req,res) =>{
    try {
        const {id} = req.body;
         const cart = await pool.query("SELECT * FROM carts WHERE user_id = $1, ", [id]);
        res.status(200).json(cart)
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
}

)

//get all carts

router.get("/carts", async (req,res) =>{
    try {
         const carts=await pool.query("SELECT * FROM carts ");
        res.status(200).json(carts)
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
}

)

module.exports = router;