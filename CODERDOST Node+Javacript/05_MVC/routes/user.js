const express = require('express')
const controller =require('../controller/userController')
const userRouter =express.Router();

userRouter
.get("/", controller.frontpage)
.get("/", controller.getAllUsers)
.get("/:id", controller.getSingleUser)
.post("/", controller.createUser)
.put("/:id", controller.updataUser)
.patch("/:id", controller.replaceUser)
.delete("/:id", controller.deleteUser)

module.exports = userRouter;