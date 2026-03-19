const ConversationsModel = require('../models/conversations')

const getAllConversation = async (req, res, next) => {
    try {
        const data = await ConversationsModel.findAll() 
        res.json(data) 
    } catch (error) {
        next(error)
    }
}

const createorGetConversation = async (req, res, next) => {                           ///สร้างห้อง
    try {

        const { listing_id, buyer_id, seller_id } = req.body

        const errors = []
        if (!listing_id) errors.push('กรุณาระบุ listing_id')
        if (!buyer_id) errors.push('กรุณาระบุ buyer_id')
        if (!seller_id) errors.push('กรุณาระบุ seller_id')

        if (errors.length > 0) {
            return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
        }

        //  เช็คว่ามีห้อง
        const existing = await ConversationsModel.findByUsersAndListing(
            listing_id, buyer_id,  seller_id
        )


        if (existing) {
            return res.json({
                message: 'มีห้องอยู่แล้ว',
                data: existing
            })
        }

        //สร้างห้องใหม่
        const result = await ConversationsModel.create({
            listing_id,
            buyer_id,
            seller_id,
            status: 'active'
        })

        res.status(201).json({
            message: 'สร้างห้องสำเร็จ',
            data: result
        })

    } catch (error) {
        next(error)
    }
}

//ดูห้องเดียว
const getConversationById = async (req, res, next) => {
    try {
        const conversation = await ConversationsModel.findById(req.params.id)

        if (!conversation) {
            return res.status(404).json({ message: 'ไม่พบ conversation' })
        }

        res.json(conversation)
    } catch (error) {
        next(error)
    }
}

// อัปเดตสถานะ 

const updateConversationStatus = async (req, res, next) => {
    try {
        const { status } = req.body

        const allowedStatus = ['active', 'completed', 'cancelled']

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: 'status ไม่ถูกต้อง',
                allowed: allowedStatus
            })
        }

        const result = await ConversationsModel.updateStatus(
            req.params.id,
            status
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบ conversation' })
        }

        res.json({
            message: 'อัปเดตสถานะสำเร็จ',
            data: result
        })

    } catch (error) {
        next(error)
    }
}


const removeConversation = async (req, res, next) => {
    try {
        const result = await ConversationsModel.remove(req.params.id)
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบ conversation ที่ต้องการลบ' })
        }

        res.json({ message: 'ลบห้องสนทนาเรียบร้อยแล้ว' })
    } catch (error) {
        next(error)
    }
}



module.exports = { getAllConversation,getConversationById, createorGetConversation, updateConversationStatus, removeConversation }