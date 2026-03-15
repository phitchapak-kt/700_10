const { getConnection } = require('../config/db')

const findAll = async () => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT saved_listings.*,
            users.firstname AS user_firstname,
            users.lastname AS user_lastname,
            listings.title AS listing_title

        FROM saved_listings
        JOIN users ON saved_listings.user_id = users.id
        JOIN listings ON saved_listings.listing_id = listings.id
        ORDER BY saved_listings.created_at DESC
    `)
    return rows

}

const findById = async (id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
         SELECT saved_listings.*,
            users.firstname AS user_firstname,
            users.lastname AS user_lastname,
            listings.title AS listing_title

        FROM saved_listings
        JOIN users ON saved_listings.user_id = users.id
        JOIN listings ON saved_listings.listing_id = listings.id
        WHERE saved_listings.id = ?
    `, [id])

    return rows[0]

}


const create = async (data) => {
    const conn = await getConnection()
    const { user_id, listing_id } = data
    const [result] = await conn.query(
        'INSERT INTO saved_listings (user_id, listing_id) VALUES (?, ?)',
        [user_id, listing_id]
    )
    return result
}

const update = async (id, data) => {
    const conn = await getConnection()
    const { user_id, listing_id } = data
    const [result] = await conn.query(
        'UPDATE saved_listings SET user_id=?, listing_id=? WHERE id=?',
        [user_id, listing_id,id]
    )
    return result
}

const remove = async (id) => {
    const conn = await getConnection()
    const [result] = await conn.query('DELETE FROM saved_listings WHERE id = ?', [parseInt(id)])
    return result
}

module.exports = { findAll, findById, create, update, remove }
