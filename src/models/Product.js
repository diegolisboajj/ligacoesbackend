const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    origem: {
        type: String,
        require: true,
    },
    destino: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



mongoose.model("Product", ProductSchema);