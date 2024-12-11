const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employeeModels');

// Hàm đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Tìm kiếm nhân viên theo email
    const employee = await employeeModel.findEmployeeByEmail(email);
    console.log(employee);
    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Kiểm tra mật khẩu
    
    if (password!=employee.Password) {
        console.log(password);
        console.log(employee.Password);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tạo token JWT
    const token = jwt.sign({
      id: employee.EmployeeID,
      email: employee.Email,
      firstName: employee.FirstName,
      lastName: employee.LastName,
      phoneNumber: employee.PhoneNumber,
      address: employee.Address,
      salary: employee.Salary,
      workHours: employee.WorkHours,
      supervisorID: employee.SupervisorID
    }, "secrettoken", {
      expiresIn: '6h' // Token hết hạn sau 1 giờ
    });

    return res.json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
