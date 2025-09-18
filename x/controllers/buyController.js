    const { Cart } = require("../models/cart");
    const { Product } = require("../models/product");
    const { Coupen } = require("../../Coupen-Api-main/models/coupen");

    // Buy without discount
    const buyWithoutDiscount = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) return res.status(400).json({ message: "Username is required" });

        // Get all items in cart
        const cartItems = await Cart.find({ username });
        if (cartItems.length === 0) {
        return res.status(404).json({ message: "Cart is empty" });
        }

        let productNames = [];
        let total = 0;

        for (let item of cartItems) {
        const product = await Product.findOne({ ProductName: item.ProductName });
        if (product) {
            productNames.push(product.ProductName);
            total += product.price;
        }
        }

        res.json({
        ProductName: productNames,
        total: `$${total}`
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Buy with discount
    const buyWithDiscount = async (req, res) => {
    try {
        const { discount_coupen, username } = req.body;

        if (!discount_coupen || !username) {
        return res.status(400).json({ message: "Discount coupen and username are required" });
        }

        // Get all items in cart
        const cartItems = await Cart.find({ username });
        if (cartItems.length === 0) {
        return res.status(404).json({ message: "Cart is empty" });
        }

        // Collect products
        let productNames = [];
        let total = 0;

        for (let item of cartItems) {
        const product = await Product.findOne({ ProductName: item.ProductName });
        if (product) {
            productNames.push(product.ProductName);
            total += product.price;
        }
        }

        // Check discount coupen
        const coupen = await Coupen.findOne({ coupenCode: discount_coupen });
        if (!coupen) {
        return res.status(400).json({ message: "Invalid coupen" });
        }

        const discountValue = coupen.discount; // assume it's % e.g. 20
        const totalAfterDiscount = total - (total * discountValue / 100);

        res.json({
        ProductName: productNames,
        Total_before_discount: `$${total}`,
        Total_after_discount: `$${totalAfterDiscount}`
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    module.exports = { buyWithoutDiscount, buyWithDiscount };
