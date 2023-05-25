const express = require('express')
const router = express.Router()

const productController = require("../Controller/ProductController")

const addCustomHeaders = (req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept, Your-Custom-Header');
 next();
};

// GET all users
router.get("/all",addCustomHeaders, productController.getAll)
router.get("/:idProduct/getOne",addCustomHeaders,productController.getProductById)
router.get("/:idProduct/pictures",addCustomHeaders, productController.getPictures)
router.post("/update-product",addCustomHeaders, productController.updateProduct)
router.get("/get-products-by/:param/:value",addCustomHeaders,productController.getAllByFilter)
module.exports = router;