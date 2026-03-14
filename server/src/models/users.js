const { getConnection } = require('../config/db')

const findAll = async () => {
    const conn = await getConnection()
    const [rows] = await conn.query('SELECT * FROM users')
    return rows
}

const findById = async (id) => {
    const conn = await getConnection()
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id])
    return rows[0]
}

const create = async (data) => {
    const conn = await getConnection()
    const { firstname, lastname, email, password, phone } = data
    const [result] = await conn.query(
        'INSERT INTO users (firstname, lastname, email, password, phone) VALUES (?, ?, ?, ?, ?)',
        [firstname, lastname, email, gpassword, phone]
    )
    return result
}

const update = async (id, data) => {
    const conn = await getConnection()
    const { firstname, lastname, email, gpassword, phone } = data
    const [result] = await conn.query(
        'UPDATE users SET firstname=?, lastname=?, email=?, password=?,  phone=? WHERE id=?',
        [firstname, lastname, email, gpassword, phone,id]
    )
    return result

}

const remove = async (id) => {
  const conn = await getConnection()
  const [result] = await conn.query('DELETE FROM users WHERE id = ?', [parseInt(id)])
  return result
}

module.exports = { findAll, findById, create, update, remove }