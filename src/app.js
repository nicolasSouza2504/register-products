const express = require("express");
const productsRoutes = require("./routes/product-routes");

class App {

    constructor() {

        this.server = express();

        this.middlewares();

        this.routes();

    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(productsRoutes);
    }

}

module.exports = new App().server;
