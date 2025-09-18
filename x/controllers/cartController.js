    const { Cart } = require("../models/cart");
    const { Product } = require("../models/product");

    // Add to cart
    const addToCart = async (req, res) => {
    try {
        const { ProductName, username } = req.body;
        if(!ProductName || !username)return res.status(400).json({ message: "Missing required fields" });

        const product = await Product.findOne({ ProductName });
        if (!product) return res.status(404).json({ message: "Product not found" });

        const item = new Cart({ ProductName, username });
        await item.save();
        res.json({ message: "Product added to cart", item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Delete from cart
    const deleteFromCart = async (req, res) => {
    try {
        const { ProductName, username } = req.body;
        if(!ProductName || !username)return res.status(400).json({ message: "Missing required fields" });
        
        const item = await Cart.findOneAndDelete({ ProductName, username });
        if (!item) return res.status(404).json({ message: "Item not found in cart" });
        res.json({ message: "Product removed from cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    module.exports = { addToCart, deleteFromCart };
