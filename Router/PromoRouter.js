const express = require('express')
const router = express.Router()
const PromoController=require('../Controller/PromoController')

router.get("/verifyPromo/:codePromo", PromoController.verifyPromo)
router.get("/get-all", PromoController.getAll)
router.post("/update", PromoController.update)
router.post("/create", PromoController.create)
router.delete("/delete/:codePromo", PromoController.delete)

module.exports = router;