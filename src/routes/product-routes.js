const {Router} = require("express");
const routes = new Router();
const Product = require('../model/product')
const productController = require('../controller/product.controller')

routes.get("/list-all", (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Product.findAll().then(products => {
        return res.status(200).json(products);
    }).catch(error => {
        return res.status(500).json({message: 'Error get products: ' + JSON.stringify(error)})
    });

});

routes.post("/save", (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Product.create(req.body).then(prod => {
        return res.status(200).json({message: 'Product has been saved'});
    }).catch(error => {
        return res.status(500).json(error);
    });

});

routes.put("/edit", (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    return productController.updateProduct(req.body, req.query, res)

});

module.exports = routes;
