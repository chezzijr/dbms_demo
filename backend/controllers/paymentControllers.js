// controllers/paymentController.js
const paymentModel = require('../models/paymentModels');

const getPaymentsInRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Both startDate and endDate are required' });
  }

  try {
    const payments = await paymentModel.getPaymentsInRange(startDate, endDate);
    return res.status(200).json(payments);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching payments', error: err.message });
  }
};

const calculateTotalRevenueInRange = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Both startDate and endDate are required' });
    }
  
    try {
      const totalRevenue = await paymentModel.calculateTotalRevenueInRange(startDate, endDate);
      return res.status(200).json({ totalRevenue });
    } catch (err) {
      return res.status(500).json({ message: 'Error calculating total revenue', error: err.message });
    }
  };
  
  module.exports = { getPaymentsInRange, calculateTotalRevenueInRange };
