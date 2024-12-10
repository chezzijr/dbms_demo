// routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/paymentControllers');
const router = express.Router();

// Định nghĩa route cho API lấy dữ liệu thanh toán
router.get('/get', paymentController.getPaymentsInRange);
router.get('/revenue', paymentController.calculateTotalRevenueInRange);
module.exports = router;
