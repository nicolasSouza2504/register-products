const {Router} = require("express");
const routes = new Router();
const Product = require('../model/product')

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

    const name = req.query.name;
    const code = req.query.code;

    if (name && code) {

        const objFind = {};

        objFind.where = {};

        if (!req.body || !req.body.name && !req.body.code) {
            return res.status(500).json({message: 'Body must be completed with name or code of the product to update the values!'})
        }

        if (name) {
            objFind.where.name = name
        }

        if (code) {
            objFind.where.code = code;
        }

        Product.findOne(objFind).then(prod => {

            if (prod != null) {

                if (req.body.name) {
                    prod.name = req.body.name;
                }

                if (req.body.code) {
                    prod.code = req.body.code;
                }

                prod.save().then(prod => {
                    return res.status(200).json({message: 'Product has been updated!'});
                }).catch(error => {
                    return res.status(500).json(error);
                })

            } else {
                return res.status(404).json({message: 'Not found product!'});
            }

        }).catch(error => {
            return res.status(500).json(error);
        });

    } else {
        return res.status(500).json({message: 'Send us the name and the code of the product that will be updated by query params!'})
    }

});

module.exports = routes;
