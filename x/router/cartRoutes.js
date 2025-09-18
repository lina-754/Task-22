const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { addToCart, deleteFromCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/add", checkAuth, addToCart);
router.delete("/delete", checkAuth, deleteFromCart);

module.exports = router;
