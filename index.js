const express=require('express')
const app=express()
const userRouter = require("./Router/UserRouter")
const productRouter =require("./Router/ProductRouter")
const cartRouter=require("./Router/CartRouter")
const promoRouter=require("./Router/PromoRouter")
const orderRouter=require("./Router/OrderRouter")
const cors=require('cors')
require("dotenv").config();

const url=process.env.URL

var corsOptions = {
  origin:url,
  //origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())

app.use("/user", userRouter);
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/promo",promoRouter)
app.use("/order",orderRouter)

app.listen(5000,()=>{
 //pour commencer le serveur : npm run dev
 console.log("server starded on port 5000")
})