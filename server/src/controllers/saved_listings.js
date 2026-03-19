const Saved_listingsModel = require('../models/saved_listings')

const getAllSave = async (req, res, next) => {
    try {
        const savedlistings = await Saved_listingsModel.findAll()
        res.json(savedlistings)
    } catch (error) {
        next(error)
    }
}

// 2. ดึงรายการที่ User คนหนึ่งบันทึกไว้ (ใช้บ่อยที่สุด)
// รองรับ GET /saved-posts/user/:user_id
const getByUserSaveId = async (req, res, next) => {
    try {
        const { user_id } = req.params
        const listings = await Saved_listingsModel.findByUserId(user_id)
        res.json(listings)
    } catch (error) {
        next(error)
    }
}


const createSave = async (req, res, next) => {
    try {
        const { user_id, listing_id } = req.body
        
        if (!user_id || !listing_id) {
            return res.status(400).json({ message: 'กรุณาระบุ user_id และ listing_id' })
        }

        // (Option) เช็คก่อนว่าเคยเซฟหรือยัง เพื่อไม่ให้เกิด Error ใน DB
        const existing = await Saved_listingsModel.checkDuplicate(user_id, listing_id)
        if (existing) {
            return res.status(400).json({ message: 'คุณบันทึกประกาศนี้ไปแล้ว' })
        }

        const result = await Saved_listingsModel.create({ user_id, listing_id })
        res.json({ message: 'บันทึกประกาศสำเร็จ', data: result })

    } catch (error) {
        next(error)
    }
}


const removeSave = async (req, res, next) => {
    try {
        const { user_id, listing_id } = req.body // รับจาก body สำหรับปุ่มกด Unsave
        
        // ถ้าส่งมาเป็น ID ของแถว (req.params.id)
        const id = req.params.id 
        
        let result;
        if (id) {
            result = await Saved_listingsModel.remove(id)
        } else {
            // ลบโดยใช้คู่ user_id และ listing_id
            result = await Saved_listingsModel.removeByPair(user_id, listing_id)
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบรายการที่ต้องการลบ' })
        }
        res.json({ message: 'ยกเลิกการบันทึกสำเร็จ' })
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllSave ,getByUserSaveId ,createSave, removeSave}