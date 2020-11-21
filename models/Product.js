const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Поле category обязательно для заполнения"]
    },
    title: {
        type: String,
        required: [true, "Поле title обязательно для заполнения"]
    },
    description: {
        type: String,
        required: [true, "Поле description обязательно для заполнения"]
    },
    price: {
        type: Number,
        required: [true, "Поле price обязательно для заполнения"],
        min: 0
    },
    image: {
        type: String,
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;