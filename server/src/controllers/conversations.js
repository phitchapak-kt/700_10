const ConversationsModel = require('../models/conversations')

const getAll = async (req, res, next) => {
    try {
        const conversations = await ConversationsModel.findAll()
        res.json(conversations)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const conversations = await ConversationsModel.findById(req.params.id)
        if (!conversations) return res.status(404).json({ message: 'ไม่พบ conversations' })
        res.json(conversations)
    } catch (error) {
        next(error)
    }
}


const create = async (req, res, next) => {
    try {

        const { listing_id, buyer_id, seller_id } = req.body
        const errors = []
        if (!listing_id) errors.push('กรุณาระบุ listing_id')
        if (!buyer_id) errors.push('กรุณาระบุ buyer_id')
        if (!seller_id) errors.push('กรุณาระบุ seller_id')
        if (errors.length > 0) {
            return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
        }
        const result = await ConversationsModel.create(req.body)
        res.json({ message: 'insert ok', data: result })

    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await ConversationsModel.remove(req.params.id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบ lconversations' })
        }
        res.json({ message: 'delete ok', data: result })
    } catch (error) {
        next(error)
    }
}
module.exports = { getAll, getById, create, remove }