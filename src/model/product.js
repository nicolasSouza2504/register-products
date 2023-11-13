const {DataTypes} = require('sequelize')

const {sequelize} = require("../db/sequelize");

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'product',
    uniqueKeys: {
        actions_unique: {
            fields: ['name', 'code']
        }
    }
});

module.exports = Product;
