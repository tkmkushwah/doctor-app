const express = require("express");
require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path=require("path")


//dotenv conig
dotenv.config({path:'./config/.env'});

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());


//routes
app.use("/api/v1/user", require("./routes/userRoutes"));

//static files
app.use(express.static(path.join(__dirname,'../client/build')))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../client/build/index.html"))
})

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
