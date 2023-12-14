const express = require('express')
const productController =require('../controller/productController')
const productRouter =express.Router();

// Middleware function
function myMiddleware(req, res, next) {
	console.log('Middleware function called');
	next();
}
productRouter.use("/:id",myMiddleware);

productRouter
.get("/", productController.frontpage)
.get("/", productController.getAllProducts)
.get("/:id", productController.getSingleProduct)
.post("/", productController.createProduct)
.put("/:id", productController.updataProduct)
.patch("/:id", productController.replaceProduct)
.delete("/:id", productController.deleteProduct)

module.exports = productRouter;