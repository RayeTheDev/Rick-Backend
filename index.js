require("dotenv").config()

const express=require("express"),cors=require("cors"),{ connect } = require("./config/db");const { userRouter } = require("./routes/userRoutes");
;

const app=express().use(cors(),express.json(),userRouter),port=process.env.PORT


app.listen(port,()=>{

    console.clear()
    console.log(`\x1b[32mServer on : http://localhost:${port}\n`);
    connect()

})