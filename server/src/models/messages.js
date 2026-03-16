const { getConnection } = require('../config/db')

const findAll = async () => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT messages.*,
            conversations.id AS  conversation_id,
            sender.firstname AS  sender_firstname,
            sender.lastname AS   sender_lastname
        FROM messages
        JOIN conversations ON messages.conversation_id = conversations.id
        JOIN users AS sender ON messages.sender_id = sender.id
        ORDER BY messages.created_at DESC
    `)
    return rows

}

const findById = async (id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT messages.*,
            conversations.id AS  conversation_id,
            sender.firstname AS  sender_firstname,
            sender.lastname AS   sender_lastname
        FROM messages
        JOIN conversations ON messages.conversation_id = conversations.id
        JOIN users AS sender ON messages.sender_id = sender.id
        WHERE messages.id = ?
    `, [id])

    return rows[0]

}


const create = async (data) => {
    const conn = await getConnection()
    const { conversation_id, sender_id, content } = data
    const [result] = await conn.query(
        'INSERT INTO messages (conversation_id, sender_id ,content ) VALUES (?, ?, ? )',
        [conversation_id, sender_id, content ]
    )
    return result
}



const update = async (id, data) => {
    const conn = await getConnection()
    const {conversation_id, sender_id, content, is_read=0} = data
    const [result] = await conn.query(
        'UPDATE  messages SET conversation_id=?, sender_id=? , content=? ,is_read=? WHERE id=?',
        [conversation_id, sender_id, content, is_read,id]
    )
    return result
}

const remove = async (id) => {
    const conn = await getConnection()
    const [result] = await conn.query('DELETE FROM messages WHERE id = ?', [parseInt(id)])
    return result
}

module.exports = { findAll, findById, create, update, remove }