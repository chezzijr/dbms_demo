require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/sqlConfig");
const sql = require('mssql');
const paymentRoutes = require('./routes/paymentRoutes');
// Import thêm các routes khác nếu cần

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());  
app.use('/api/payment', paymentRoutes);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
