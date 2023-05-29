const express = require('express')
const router = express.Router()

const cartController = require("../Controller/CartController")

router.get("/get-cart/:idUser", cartController.getCart)
router.post("/add", cartController.add)
router.post("/merge", cartController.merge)
router.post("/update", cartController.update)
router.delete("/delete/:idUser", cartController.delete);


module.exports = router;