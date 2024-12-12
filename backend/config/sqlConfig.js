const sql = require("mssql");

const sqlConfig = {
  user: "sa",
  password: "1",
  server: "localhost",
  database: "KhoaHocOnline",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },

};

const connectDB = async () => {
  try {
    return await sql.connect(sqlConfig);
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};

module.exports = connectDB;