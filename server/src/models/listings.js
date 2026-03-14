const { getConnection } = require('../config/db')

const findAll = async () => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT listings.*,
            categories.name AS category_name,
            users.firstname, users.lastname
        FROM listings
        JOIN categories ON conversations.listing_id = listing.id
        JOIN users ON  listings.user_id = user.id
        ORDER BY listings.created_at DESC
    `)
      return rows
    
}

const findById = async (id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT listings.*, 
            categories.name AS category_name,
            users.firstname, users.lastname
        FROM listings
        JOIN categories ON listings.category_id = categories.id
        JOIN users ON listings.user_id = users.id
        WHERE listings.id = ?
    `, [id])

    return rows[0]
}

const create = async (data) => {
    const conn = await getConnection()
    const { title, description, price, category_id, type,status,user_id } = data
    const [result] = await conn.query(
        'INSERT INTO listings (title, description, price, category_id, type,status,user_id) VALUES (?, ?, ?, ?, ?,?,?)',
        [title, description, price, category_id, type,status,user_id]
    )
    return result
}

const update = async (id, data) => {
  const conn = await getConnection()
  const { title, description, price, category_id, type,status,user_id } = data
  const [result] = await conn.query(
    'UPDATE listings SET title=?, description=? ,price=? , category_id=? ,type=?,user_id=?  WHERE id=?',
    [title, description, price, category_id, type,status,user_id ]
  )
  return result
}

const remove = async (id) => {
  const conn = await getConnection()
  const [result] = await conn.query('DELETE FROM listings WHERE id = ?', [parseInt(id)])
  return result
}


module.exports = { findAll, findById, create, update, remove }