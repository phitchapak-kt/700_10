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