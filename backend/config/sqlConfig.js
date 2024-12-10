const sql = require("mssql");

const config = {
  user: "sa",
  password: process.env.PASSWORD,
  server: 'localhost', 
  database: 'KhoaHocOnline',
  options: {
      encrypt: false,
      trustServerCertificate: true, 
  },
  parseJSON: true
};

const connectDB = async () => {
  try {
    return await sql.connect(config);
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};

module.exports = connectDB;
