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

const findByUserId = async (user_id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT saved_listings.*,
            listings.title AS listing_title,
            listings.price
        FROM saved_listings
        JOIN listings ON saved_listings.listing_id = listings.id
        WHERE saved_listings.user_id = ?
        ORDER BY saved_listings.created_at DESC
    `, [user_id])
    return rows
}


// 3. เช็คว่าเซฟซ้ำหรือยัง (Controller เรียกใช้ตัวนี้)
const checkDuplicate = async (user_id, listing_id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(
        'SELECT * FROM saved_listings WHERE user_id = ? AND listing_id = ?',
        [user_id, listing_id]
    )
    return rows[0] // ถ้าเจอจะส่งข้อมูลกลับไป ถ้าไม่เจอจะเป็น undefined
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

const remove = async (id) => {
    const conn = await getConnection()
    const [result] = await conn.query('DELETE FROM saved_listings WHERE id = ?', [id])
    return result
}


const removeByPair = async (user_id, listing_id) => {
    const conn = await getConnection()
    const [result] = await conn.query(
        'DELETE FROM saved_listings WHERE user_id = ? AND listing_id = ?',
        [user_id, listing_id]
    )
    return result
}

module.exports = { findAll, findByUserId, checkDuplicate , create, remove, removeByPair}
