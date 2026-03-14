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

const create = async (name) => {
    const conn = await getConnection()
    const { name } = data
    const [result] = await conn.query(
        'INSERT INTO users (name) VALUES (?)',
        [name]
    )
    return result

}

const update = async (id, data) => {
    const conn = await getConnection()
    const { name} = data
    const [result] = await conn.query(
        'UPDATE categories SET name=? WHERE id=?',
        [name,id]
    )
    return result

}

const remove = async (id) => {
  const conn = await getConnection()
  const [result] = await conn.query('DELETE FROM users WHERE id = ?', [parseInt(id)])
  return result
}

module.exports = { findAll, findById, create, update, remove }