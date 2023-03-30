const express=require('express')
const app=express()
const cors=require('cors')
const jwt=require("jsonwebtoken")

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))//TODO:précise site
app.use(express.json())

const userRouter = require("./Router/UserRouter");
//Cela signifie que toutes les routes définies dans userRouter seront accessibles via le chemin /users.
app.use("/user", userRouter);

/*
app.get("/api",(req, res)=>{
 res.json({"users":["Jiayi HE"]})
})
*/
app.listen(5000,()=>{
 //pour commencer le serveur : npm run dev
 console.log("server starded on port 5000")
})