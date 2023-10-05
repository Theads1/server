require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool= require("./db.js");

//mid
app.use(express.json()); //req.body
app.use(cors());

//ROUTES

//Register and login 
app.use("/auth", require("./routes/jwtRegister.js"));

//profile

app.use("/api", require("./routes/profile.js"))

// others
//products
app.use("/api", require("./routes/products.js"))

//cart
app.use("/api", require("./routes/cart.js"))
app.use("/api", require("./routes/order.js"))




app.listen(PROCESS.ENV.PORT, ()=>{
    console.log("server running on 5000");
})