const { getConnection } = require('../config/db')

const findAll = async () => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT listings.*,
            listings.title AS listings_title,
        FROM listing_images
        JOIN listings ON listing_images.listings_id = listings.id
        ORDER BY listings.created_at DESC
    `)
    return rows

}


const findById = async (id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT listings.*,
            listings.title AS listings_title,
        FROM listing_images
        JOIN listings ON listing_images.listings_id = listings.id
        ORDER BY listings.created_at DESC
        WHERE listings.id = ?
    `, [id])

    return rows[0]

}

const create = async (data) => {
    const conn = await getConnection()
    const { listing_id, image_url, image_orde } = data
    const [result] = await conn.query(
        'INSERT INTO listing_images (listing_id, image_url, image_orde) VALUES (?, ?, ?)',
        [listing_id, image_url, image_orde]
    )
    return result
}


const update = async (id, data) => {
    const conn = await getConnection()
    const { listing_id, image_url, image_orde } = data
    const [result] = await conn.query(
        'UPDATE  listing_images SET listing_id=?,image_url=? , image_orde =?   WHERE id=?',
        [listing_id, image_url, image_orde]
    )
    return result
}

const remove = async (id) => {
    const conn = await getConnection()
    const [result] = await conn.query('DELETE FROM listing_images WHERE id = ?', [parseInt(id)])
    return result
}

module.exports = { findAll, findById, create, update, remove }

