const express = require('express');
const router = express.Router();
const authController = require('../controllers/employeeControllers');

// Định nghĩa route cho đăng nhập
router.post('/login', authController.login);

module.exports = router;
