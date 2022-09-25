const express = require('express');
const { authStudent, authTeacher } = require('../middleware/auth')
const {registerUser, loginUser} = require('../services/authServices')
const router = express.Router()

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;