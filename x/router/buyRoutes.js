const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { buyWithoutDiscount, buyWithDiscount } = require("../controllers/buyController");

const router = express.Router();

router.post("/without-discount", checkAuth, buyWithoutDiscount);
router.post("/discount", checkAuth, buyWithDiscount);

module.exports = router;
