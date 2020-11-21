const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get("/", async (req, res) => {
    let query;
    if (req.query.category) {
        query = {category: req.query.category};
    }
    try {
        const products = await Product.find(query).populate("category", "title description");
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const result = await Product.findById(req.params.id).populate("category")
            .populate("user");
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(500);
    }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
    const token = req.get('Authorization');
    const userToken = await User.findOne({token});

    const productData = req.body;
    if (req.file) {
        productData.image = req.file.filename;
    }
    productData.user = userToken._id;
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send("Category does not exists");
    const product = new Product(productData);
    try {
        await product.save();
        res.send(product);
    } catch(e) {
        return res.status(400).send(e);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        req.body.user = req.user._id;
        const del = await Product.findOneAndRemove({
            _id: req.params.id,
            user: req.user._id
        });
        if (!del) {
            return res
                .status(403)
                .send({ message: "You don't have privileges for this operation" });
        }
        return res.send({ message: `${req.params.id} removed` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

module.exports = router;