const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise')
const app = express();
const cors = require('cors');


app.use(cors());

app.use(bodyParser.json());

const port = 8000;

let conn = null;

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'jsdb'
    });
    console.log('Connected to MySQL database');
}

//เปิด server
app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on http://localhost:${port}`);
})

// เรียกใช้งานผู้ใช้ ข้อมูลใช้งาน
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT id, username, email ,Phone FROM users');
    res.json(results[0]);
})






