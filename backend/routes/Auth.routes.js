const express = require('express');
const router = express.Router();
const { register, login, logout, adminLogin } = require('../controller/Auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
// admin login should be accessible (it verifies credentials itself)
router.post('/adminlogin', adminLogin);
module.exports = router;