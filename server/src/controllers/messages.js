const MessagesModel = require('../models/messages')

const getAllMessages = async (req, res, next) => {                              //ดึงข้อความ
    try {
        const messages = await MessagesModel.findAll()
        res.json(messages)
    } catch (error) {
        next(error)
    }
}

const getMessagesById = async (req, res, next) => {
    try {
        const messages = await MessagesModel.findById(req.params.id)
        if (!messages) return res.status(404).json({ message: 'ไม่พบ messages' })
        res.json(messages)
    } catch (error) {
        next(error)
    }
}

const createMessages = async (req, res, next) => {                                                      ///ส่งข้อความม
    try {

        const { conversation_id, sender_id, content } = req.body
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

const updateMessages = async (req, res, next) => {                                                      //
try {
        const { id } = req.params
        const { content, is_read } = req.body

        // 1. เช็คก่อนว่ามีข้อมูลส่งมาแก้ไขไหม
        if (content === undefined && is_read === undefined) {
            return res.status(400).json({ message: 'กรุณาระบุข้อมูลที่ต้องการแก้ไข (content หรือ is_read)' })
        }

        // 2. สั่งอัปเดต (ส่งไปแค่ 2 arguments: ID และก้อน Data)
        const result = await MessagesModel.update(id, { content, is_read })

        // 3. เช็คว่าเจอแถวที่อัปเดตไหม
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบข้อความที่ต้องการแก้ไข' })
        }

        res.json({ message: 'แก้ไขข้อมูลสำเร็จ', data: result })
    } catch (error) {
        next(error)
    }
}


const removeMessages = async (req, res, next) => {
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
module.exports = { getAllMessages, getMessagesById, createMessages, updateMessages, removeMessages }

