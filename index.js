const express = require("express");
const users = require("./app/users");
const products = require("./app/products");
const categories = require("./app/categories");
const config = require("./config");

const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
    await mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true, autoIndex: true});
    app.use("/users", users);
    app.use("/products", products);
    app.use("/categories", categories);

    console.log("Connected to mongoDB");

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.log);
