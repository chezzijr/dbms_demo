const sql = require('mssql');

(async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
    } catch (err) {
        console.log(err);
    }
})()
sql.on('error', err => {
    console.log(err);
})
export default sql;
