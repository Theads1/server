const {authorization} = require("../middleware/authorization.js");
const pool = require("../db.js");

const router = require("express").Router();

//create product

router.post("/createproduct", async (req, res) => {

    try {
        const { title, price, description, category, image, rate } = req.body;
        const newProduct = await pool.query(
            "INSERT into products (title, price, description, category, img, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
             [ title, price, description, category, image, rate ])

    res.json(newProduct);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//delete product
router.delete("/:id", async (req,res) =>{
    try {
        const {id} = req.body;
         await pool.query("DELETE FROM products WHERE product_id = $1 RETURNING *", [id]);
        res.status(200).json("Product Deleted")
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
}

)

//get product
router.get("/find/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);
        res.status(200).json(product);        
    } catch (error) {
        console.error(error)
        res.status(500).json("server error");
    }
}


)
//search
router.get("/merch/search", async (req,res) =>{
 const {q}= req.query;

    try {

    const products = await pool.query("SELECT * FROM products");
    const keys=["title", "description","category"] ;
    const search = (data)=>{
        return  data.filter((item)=>
        keys.some((key)=>item[key].toLowerCase().includes(q))
        );
    };
         
        res.json(search(products.rows))
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
}
)

router.get("/merch", async (req,res) =>{
    const {category} = req.query;
    try {
        let product;
        if (!category){
            product = await pool.query("SELECT * FROM products");


        }else{
            product = await pool.query("SELECT * FROM products WHERE category = $1", [category]);
        }

        res.status(200).json(product);   
        
    } catch (error) {
        console.error(error)
        res.status(500).send("server error");
    }
}
)

//update product

// router.put("/:id", async (req, res) => {

//     try {
//         const { title, price, description, category, image, rate } = req.body;
//         const newProduct = await pool.query(
//             "UPDATE products SET (title, price, description, category, img, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//              [ title, price, description, category, image, rate ])

//     res.json(newProduct);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("server error");
//     }
// })



module.exports = router;