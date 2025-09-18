const express = require('express')
const router = express.Router()
const {login} = require('../controllers/loginController');
const {register} = require('../controllers/registerController');
const {sendotp} = require('../controllers/sendotpcontroller')



router.post('/login', login)
router.post('/register', register)
router.post('/send-otp',sendotp)

module.exports = router