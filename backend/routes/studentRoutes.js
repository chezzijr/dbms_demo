// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const connectDB = require('../config/sqlConfig');

function validateStudentPayload(sp, withId = false) {
    const keys = ["Email", "Password", "FirstName", "LastName", "PhoneNumber", "Address", "AccountBalance"]
    for (const key of keys) {
        if (!sp[key]) {
            return false
        }
    }
    if (withId && !sp.StudentID) {
        return false
    }
    return true
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// get
router.get("/get", async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query('select * from students')
        res.json(result.recordset)
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message })
    }
})
// add
router.post("/add", async (req, res) => {
    const body = req.body
    if (!validateStudentPayload(body)) {
        res.status(422).json({ message: "Error: invalid body type" })
        return
    }
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('Email', sql.VarChar, body.Email)
            .input('Password', sql.VarChar, body.Password)
            .input('FirstName', sql.VarChar, body.FirstName)
            .input('LastName', sql.VarChar, body.LastName)
            .input('PhoneNumber', sql.VarChar, body.PhoneNumber)
            .input('Address', sql.VarChar, body.Address)
            .input('AccountBalance', sql.Decimal, body.AccountBalance)
            .query('insert into students (Email, Password, FirstName, LastName, PhoneNumber, Address, AccountBalance) values (@Email, @Password, @FirstName, @LastName, @PhoneNumber, @Address, @AccountBalance)')
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message })
    }
})

// update
router.put("/update", async (req, res) => {
    const body = req.body
    if (!validateStudentPayload(body, withId = true)) {
        res.status(422).json({ message: "Error: invalid body type" })
    }
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('Email', sql.VarChar, body.Email)
            .input('Password', sql.VarChar, body.Password)
            .input('FirstName', sql.VarChar, body.FirstName)
            .input('LastName', sql.VarChar, body.LastName)
            .input('PhoneNumber', sql.VarChar, body.PhoneNumber)
            .input('Address', sql.VarChar, body.Address)
            .input('AccountBalance', sql.Decimal, body.AccountBalance)
            .input('id', sql.Int, body.StudentID)
            .query('update students set Email = @Email, Password = @Password, FirstName = @FirstName, LastName = @LastName, PhoneNumber = @PhoneNumber, Address = @Address, AccountBalance = @AccountBalance where StudentID = @id')
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message })
    }
})

// delete
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(422).json({ message: "Error: invalid query parameter" })
    }
    // id must be a number 
    if (!isNumeric(id)) {
        res.status(422).json({ message: "Error: invalid query parameter" })
    }
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('delete from students where StudentID = @id')
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message })
    }
})

module.exports = router;