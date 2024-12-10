// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config  = {
    user: "sa",
    password: "123456789",
    server: 'localhost', 
    database: 'KhoaHocOnline',
    options: {
        encrypt: false,
        trustServerCertificate: true, 
    },
    parseJSON: true
};

sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

const app = express()
app.use(express.json())

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
    const result = await sql.query`select * from students for json auto`
    res.json(result.recordset[0])
})
// add
router.post("/add", async (req, res) => {
    const body = req.body
    if (!validateStudentPayload(body)) {
        res.status(422).send("You stupid")
    }
    // true sigma will never be afraid of sql injection
    const result = await sql.query`
        insert into (Email, Password, FirstName, LastName, PhoneNumber, Address, AccountBalance)
        values (
            ${body.Email},
            ${body.Password},
            ${body.FirstName},
            ${body.LastName},
            ${body.PhoneNumber},
            ${body.Address},
            ${body.AccountBalance}
        )
    
    `
    res.json(result)
})

// update
router.put("/update", async (req, res) => {
    const body = req.body
    if (!validateStudentPayload(body, withId = true)) {
        res.status(422).send("You stupid")
    }
    const result = await sql.query`
        update students
        set
            Email = ${body.Email},
            Password = ${body.Password},
            FirstName = ${body.FirstName},
            LastName = ${body.LastName},
            PhoneNumber = ${body.PhoneNumber},
            Address = ${body.Address},
            AccountBalance = ${body.AccountBalance}
        where StudentID = ${body.id}
    `
    res.json(result)
})

// delete
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const result = await sql.query`
        delete from students
        where StudentID = ${id}
    `
    res.json(result)
})

module.exports = router;