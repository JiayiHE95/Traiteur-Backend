const express = require('express')
const router = express.Router()
const PromoController=require('../Controller/PromoController')

router.get("/verifyPromo/:codePromo", PromoController.verifyPromo)

module.exports = router;