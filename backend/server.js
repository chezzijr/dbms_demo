require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/sqlConfig"); // Đảm bảo bạn đã import đúng file sqlConfig
const paymentRoutes = require('./routes/paymentRoutes');
const studentRoutes = require('./routes/studentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
// Import thêm các routes khác nếu cần

const app = express();
const port = 5000;


// Kết nối với cơ sở dữ liệu khi ứng dụng khởi động
connectDB().then(() => {
  console.log("Connected to the database");

  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api/payment', paymentRoutes);
  app.use('/api/student', studentRoutes);
  app.use('/api/employee', employeeRoutes);
  console.log("test student connection")

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to the database:", err);
});
