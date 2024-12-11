
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route để cập nhật nhân viên
router.post('/update-employee', employeeController.updateEmployee);
router.get("/search", employeeController.searchEmployees);
router.post("/add", employeeController.createEmployee);

module.exports = router;
