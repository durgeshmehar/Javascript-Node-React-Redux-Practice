const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const data = JSON.parse(fs.readFileSync("./public/data.json", "utf-8"));
const products = data.products;
const server = express();
server.use(express.static('public'))
server.use(express.json())
server.use(express.urlencoded())


// 1) Read Operation( GET /products)   C R U D
server.get("/products", (req, res) => {
    res.json(products);
})
// Just to Test Public
server.get("/jsondata", (req, res) => {
    res.sendFile(__dirname + '/public/data.json');
})

// 1.2)Read Operation( GET /products/:id )
server.get("/products/:id", (req, res) => {
    const id = +req.params.id;
    const singleProduct = products.find(p => p.id === id);
    res.json(singleProduct);
})

// 2) Create (write) product
server.post("/products", (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
})

//3) UPDATE (put) Only show input property ->full Update
server.put("/products/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1, { ...req.body, id: id })
    res.status(201).json(productIndex);
})

//3.2) UPDATE (patch) replaced input property(Partialy update)
server.patch("/products/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, { ...product, ...req.body })
    res.status(201).json(productIndex);
})

// 4) DELETE

server.delete("/products/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1)
    res.status(201).json(product);
})


server.listen(3000, () => {
    console.log("Server started ...")
})