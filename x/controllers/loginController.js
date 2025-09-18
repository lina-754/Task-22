const { usersData } = require('../models//users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password ,email} = req.body;
        if ((!username && !email )|| !password) {
            return res.status(400).json({ message: "All inputs are required" })
        }
        const getUser = await usersData.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] })
        if (!getUser) {
            return res.status(400).json({ message: "Invalid username or email" })
        }
        const comparePassword = await bcrypt.compare(password, getUser.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid password" })
        }

        if (getUser.status === false) {
            return res.status(400).json({ message: "Your account is not verified" })
        }

        const token = jwt.sign({ firstName: getUser.firstName, lastName: getUser.lastName, email: getUser.email, role: getUser.role }, process.env.JWT_SECRET, { expiresIn: "1m" });
        

        return res.json({ message: 'login done' , token: token})
    }
    catch (error) {
        console.log(error)
    }

}


module.exports = { login }