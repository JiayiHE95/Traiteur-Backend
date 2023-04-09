const express = require('express')
const router = express.Router()

const productController = require("../Controller/ProductController")

// GET all users
router.get("/all", productController.getAll)
router.get("/:idProduct/getOne",productController.getProductById)
router.get("/:idProduct/pictures", productController.getPictures)


module.exports = router;