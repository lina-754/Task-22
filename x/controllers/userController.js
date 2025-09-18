const bcrypt = require("bcryptjs");
const { Auth } = require("../models/auth");

// Change Password
const changePassword = async (req, res) => {
    try {
        const { username, password, confirm_password } = req.body;

        if (!username || !password || !confirm_password) {
        return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await Auth.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Auth.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: "Invalid password" });

        await Auth.deleteOne({ username });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await Auth.find(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { changePassword, deleteUser, getAllUsers };
