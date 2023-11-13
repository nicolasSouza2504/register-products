const Product = require("../model/product");
const productController = {

    updateProduct(objEditor, objQuery, res) {

        if (objQuery && objQuery.name && objQuery.code) {

            const objFind = {};

            objFind.where = {};

            if (!objEditor || !objEditor.name && !objEditor.code) {
                return res.status(500).json({message: 'Body must be completed with name or code of the product to update the values!'})
            }

            if (objQuery.name) {
                objFind.where.name = objQuery.name;
            }

            if (objQuery.code) {
                objFind.where.code = objQuery.code;
            }

            Product.findOne(objFind).then(prod => {

                if (prod != null) {

                    if (objEditor.name) {
                        prod.name = objEditor.name;
                    }

                    if (objEditor.code) {
                        prod.code = objEditor.code;
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

    }

}

module.exports = productController;
