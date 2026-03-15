const MessagesModel = require('../models/messages')

const getAll = async (req, res, next) => {
    try {
        const messages = await MessagesModel.findAll()
        res.json(messages)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const messages = await MessagesModel.findById(req.params.id)
        if (!messages) return res.status(404).json({ message: 'ไม่พบ messages' })
        res.json(messages)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {

        const { conversation_id, sender_id, content, is_read } = req.body
        const errors = []
        if (!conversation_id) errors.push('กรุณาระบุ conversation_id')
        if (!sender_id) errors.push('กรุณาระบุ sender_id')
        if (!content) errors.push('กรุณาระบุ ข้อความ')
        if (errors.length > 0) {
            return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
        }
        const result = await MessagesModel.create(req.body)
        res.json({ message: 'insert ok', data: result })

    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await MessagesModel.remove(req.params.id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบ lmessages' })
        }
        res.json({ message: 'delete ok', data: result })
    } catch (error) {
        next(error)
    }
}
module.exports = { getAll, getById, create, remove }

