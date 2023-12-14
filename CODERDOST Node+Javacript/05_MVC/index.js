const express = require('express')
const ProductRouter = require('./routes/product');
const UserRouter = require('./routes/user');
const server = express();

// console.log("ENV Password :",process.env.DB_PASSWORD);
// 1) flexibility to change path as "/api/v1/product"
// server.use('/api/v1',productRouter);

// productRouter
// .get("/product", controller.frontpage)
// .get("/product", controller.getAllProducts)
// .get("/product:id", controller.getSingleProduct)
// .post("/product", controller.createProduct)
// .put("/product:id", controller.updataProduct)
// .patch("/product:id", controller.replaceProduct)
// .delete("/product:id", controller.deleteProduct)

server.use(express.json())
server.use('/products',ProductRouter)
server.use('/users',UserRouter)

server.listen(3000, () => {
    console.log("Server started ...")
})