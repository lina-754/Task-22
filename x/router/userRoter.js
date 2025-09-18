const express = require("express");
const { checkAuth } = require("../middleware/checkauth");
const { changePassword, deleteUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.put("/change-password", checkAuth, changePassword);
router.delete("/delete-user", checkAuth, deleteUser);
router.post("/all-users", checkAuth, getAllUsers);

module.exports = router;
