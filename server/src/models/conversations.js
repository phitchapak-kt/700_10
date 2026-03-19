const { getConnection } = require('../config/db')

const findAll = async () => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT conversations.*,
            listings.title AS listing_title,
            buyer.firstname AS  buyer_firstname,
            buyer.lastname AS  buyer_lastname,
            seller.firstname AS  seller_firstname,
            seller.lastname AS  seller_lastname
        FROM conversations
        JOIN listings ON conversations.listing_id = listings.id
        JOIN users AS buyer ON conversations.buyer_id = buyer.id
        JOIN users AS seller ON conversations.seller_id = seller.id
        ORDER BY conversations.created_at DESC
    `)
    return rows

}

const findById = async (id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT conversations.*,
            listings.title AS listing_title,
            buyer.firstname AS  buyer_firstname,
            buyer.lastname AS  buyer_lastname,
            seller.firstname AS  seller_firstname,
            seller.lastname AS  seller_lastname
        FROM conversations
        JOIN listings ON conversations.listing_id = listings.id
        JOIN users AS buyer ON conversations.buyer_id = buyer.id
        JOIN users AS seller ON conversations.seller_id = seller.id
        WHERE conversations.id = ?
    `, [id])

    return rows[0]

}


const findByUsersAndListing = async (listing_id, buyer_id, seller_id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(
        'SELECT * FROM conversations WHERE listing_id = ? AND buyer_id = ? AND seller_id = ?',
        [listing_id, buyer_id, seller_id]
    )
    return rows[0]
}


const create = async (data) => {
    const conn = await getConnection()
    const { listing_id, buyer_id, seller_id } = data
    const [result] = await conn.query(
        'INSERT INTO conversations (listing_id, buyer_id, seller_id ) VALUES (?, ?, ?)',
        [listing_id, buyer_id, seller_id]
    )
    return result
}



const update = async (id, data) => {
    const conn = await getConnection()
    const { listing_id, buyer_id, seller_id } = data
    const [result] = await conn.query(
        'UPDATE  conversations SET listing_id=?, buyer_id=? , seller_id =?   WHERE id=?',
        [listing_id, buyer_id, seller_id, id]
    )
    return result
}



const remove = async (id) => {
    const conn = await getConnection()
    const [result] = await conn.query('DELETE FROM conversations WHERE id = ?', [parseInt(id)])
    return result
}

module.exports = { findAll, findById,findByUsersAndListing, create, update, remove }