// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const connectDB = require('../config/sqlConfig');

router.get("/q", async (req, res) => {
    const phone = req.query.phone ?? null;
    const positionFilter = req.query.position ?? null;
    const sortBy = req.query.sortBy ?? "FullName";
    const sortOrder = req.query.sortOrder ?? "ASC";

    if (phone && !phone.match(/^\d{10}$/)) {
        res.status(422).json({ message: "Error: invalid phone number" })
        return
    }

    if (positionFilter && !["Teacher", "Assistant", "Consulting Employee"].includes(positionFilter)) {
        res.status(422).json({ message: "Error: invalid position filter. Must be one of 'Teacher', 'Assistant', 'Consulting Employee'" })
        return
    }

    if (!["ID", "FullName", "Email", "PhoneNumber", "Position", "Salary", "Expertise", "Experience", "CommunicationSkill"].includes(sortBy)) {
        res.status(422).json({ message: "Error: invalid sortBy. Must be one of 'ID', 'FullName', 'Email', 'PhoneNumber', 'Position', 'Salary', 'Expertise', 'Experience', 'CommunicationSkill'" })
        return
    }

    if (!["ASC", "DESC"].includes(sortOrder)) {
        res.status(422).json({ message: "Error: invalid sortOrder. Must be one of 'ASC', 'DESC'" })
        return
    }

    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('Phone', sql.VarChar, phone)
            .input('PositionFilter', sql.VarChar, positionFilter)
            .input('SortBy', sql.VarChar, sortBy)
            .input('SortOrder', sql.VarChar, sortOrder)
            .execute('GetEmployeeDetailsByPhone');
        res.json(result.recordset)

    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message })
    }
})

module.exports = router;