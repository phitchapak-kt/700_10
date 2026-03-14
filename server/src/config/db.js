const mysql = require('mysql2/promise')

let conn = null  

const getConnection = async () => {
  if (!conn) {            //ทำการเชื่อมครั้งเดียว
    conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',  //ดึงค่าจาก .env
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'webdb',
      port: parseInt(process.env.DB_PORT) || 8090
    })
    console.log('Connected to MySQL database')
  }
  return conn
}

module.exports = { getConnection }