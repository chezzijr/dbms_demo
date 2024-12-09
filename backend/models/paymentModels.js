// models/paymentModel.js
const connectDB = require('../config/sqlConfig');
const sql = require('mssql');
const getPaymentsInRange = async (startDate, endDate) => {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('startDate',  startDate)
      .input('endDate',  endDate)
      .query(`
        SELECT * FROM GetPaymentDetailsInRange(@startDate, @endDate)
      `);
    return result.recordset;  // Trả về dữ liệu kết quả
  } catch (err) {
    console.error('Error querying payments:', err);
    throw err;
  }
};

const calculateTotalRevenueInRange = async (startDate, endDate) => {
    try {
        const pool = await connectDB();
      const result = await pool.request()
        .input('startDate',  startDate)
        .input('endDate',  endDate)
        .query(`
          SELECT dbo.CalculateTotalRevenueInDateRange(@startDate, @endDate) AS TotalRevenue
        `);
      return result.recordset[0].TotalRevenue;  // Trả về tổng doanh thu
    } catch (err) {
      console.error('Error calculating total revenue:', err);
      throw err;
    }
  };
  
  module.exports = { getPaymentsInRange, calculateTotalRevenueInRange };
