const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        ProductName: { 
            type: String, 
            required: true 
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
