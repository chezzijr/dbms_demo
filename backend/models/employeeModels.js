const connectDB = require('../config/sqlConfig');
const sql = require('mssql');

// Hàm lấy thông tin nhân viên theo email
const findEmployeeByEmail = async (email) => {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query(`
        SELECT EmployeeID, Email, Password, FirstName, LastName, PhoneNumber, Address, Salary, WorkHours, SupervisorID
        FROM employees
        WHERE Email = @email
      `);
    return result.recordset[0];  // Trả về nhân viên tìm thấy hoặc null nếu không có kết quả
  } catch (err) {
    console.error('Error querying employee by email:', err);
    throw err;
  }
};

module.exports = { findEmployeeByEmail };
