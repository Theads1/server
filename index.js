// require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const {PORT = 5000} = process.env;
const pool= require("./db.js");

//mid
app.use(express.json()); //req.body
app.use(cors());

//ROUTES

//Register and login
app.use("/auth", require("./routes/jwtRegister.js"));

// others
//products
app.use("/api", require("./routes/products.js"))

//cart
app.use("/api", require("./routes/cart.js"))
app.use("/api", require("./routes/order.js"))




app.listen(PORT, ()=>{
    console.log("server running on 5000");
})