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

// get
router.get("/get", async (req, res) => {
    const pool = await connectDB();
    const result = await pool.request().query('select * from students')
    res.json(result.recordset)
})
// add
router.post("/add", async (req, res) => {
    const body = req.body
    if (!validateStudentPayload(body)) {
        res.status(422).send("You stupid")
    }
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
})

// update
router.put("/update", async (req, res) => {
    const body = req.body
    if (!validateStudentPayload(body, withId = true)) {
        res.status(422).send("You stupid")
    }
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
})

// delete
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const pool = await connectDB();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('delete from students where StudentID = @id')
    res.json(result)
})

module.exports = router;