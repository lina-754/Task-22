    const { Product } = require("../models/product");

    // Get all products
    const getAllProducts = async (req, res) => {
        try {
            const products = await Product.find({});
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // Get product by ProductName
    const getProduct = async (req, res) => {
        try {
            const { ProductName } = req.query; 
            const product = await Product.findOne({ ProductName });
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // Add new product
    const addProduct = async (req, res) => {
    try {
        const { ProductName, title, description, price } = req.body;

        if (!ProductName || !title || !price || !description) {
        return res.status(400).json({ message: "Missing required fields" });
        }

        const isExist = await Product.findOne({ ProductName });
        if (isExist) return res.status(400).json({ message: "Product already exists" });

        const product = new Product({ 
            ProductName, 
            title, 
            description, 
            price 
        });
        await product.save();

        res.json({ message: "Product added successfully", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Delete product
    const deleteProduct = async (req, res) => {
    try {
        const { ProductName } = req.body;
        if(!ProductName)return res.status(404).json({message:"product not found"});
        const product = await Product.findOneAndDelete({ ProductName });
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Update product data
    const changeProductData = async (req, res) => {
    try {
        const { ProductName, title, description, price } = req.body;
        if (!ProductName || !title || !price || !description) {
        return res.status(400).json({ message: "Missing required fields" });
        }

        const product = await Product.findOneAndUpdate(
        { ProductName },
        { title, description, price },
        { new: true }
        );

        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated successfully", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    module.exports = { getAllProducts, getProduct, addProduct, deleteProduct, changeProductData };
