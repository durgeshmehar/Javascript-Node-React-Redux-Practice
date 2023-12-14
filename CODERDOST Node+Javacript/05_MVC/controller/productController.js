const fs = require('fs')
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

exports.getAllProducts = (req, res) => {
    res.json(products);
}
exports.getSingleProduct = (req, res) => {
    const id = +req.params.id;
    const singleProduct = products.find(p => p.id === id);
    res.json(singleProduct);
}
exports.createProduct = (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
}
exports.updataProduct = (req, res) => {
    const id = +req.params.id;
    const singleProduct = products.findIndex(p => p.id === id);
    products.splice(singleProduct, 1, { ...req.body, id: id })
    res.status(201).json(singleProduct);
}
exports.replaceProduct = (req, res) => {
    const id = +req.params.id;
    const singleProduct = products.findIndex(p => p.id === id);
    const product = products[singleProduct];
    products.splice(singleProduct, 1, { ...product, ...req.body })
    res.status(201).json(singleProduct);
}
const path = require('path');
exports.deleteProduct = (req, res) => {
	const id = +req.params.id;
	const singleProduct = products.findIndex(p => p.id === id);
	const product = products[singleProduct];
	products.splice(singleProduct, 1)
	res.status(201).json(product);
}
exports.frontpage = (req, res) => {
	res.sendFile( path.join(__dirname, '..', 'index.html'));
}