const express = require('express')
const router = express.Router()
const orderController =require("../Controller/OrderController")

router.post("/create",orderController.create)
router.get("/get-user-by-order/:idOrder",orderController.getUser)
router.get("/get-orders-by-user/:idUser",orderController.getAllByUser)
router.get("/get-orders-by/:param/:value",orderController.getAllByFilter)
router.get("/getall",orderController.getAll)
router.post("/add-orderdetails",orderController.addOrderDetail)
router.post("/change-status",orderController.changeStatus)

module.exports = router;