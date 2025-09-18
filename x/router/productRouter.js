const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { getAllProducts, getProduct, addProduct, deleteProduct, changeProductData } = require("../controllers/productController");

const router = express.Router();

router.get("/all-product", getAllProducts);
router.get("/:product", getProduct);
router.post("/add-product", checkAuth, addProduct);
router.delete("/delete-product", checkAuth, deleteProduct);
router.put("/change-data", checkAuth, changeProductData);

module.exports = router;
