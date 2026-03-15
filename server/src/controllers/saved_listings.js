const Saved_listingsModel = require('../models/saved_listings')

const getAll = async (req, res, next) => {
    try {
        const savedlistings = await Saved_listingsModel.findAll()
        res.json(savedlistings)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const saved_listings = await Saved_listingsModel.findById(req.params.id)
        if (!saved_listings) return res.status(404).json({ message: 'ไม่พบ saved_listings' })
        res.json(saved_listings)
    } catch (error) {
        next(error)
    }
}


const create = async (req, res, next) => {
    try {

        const { user_id, listing_id} = req.body
        const errors = []
        if (!user_id) errors.push('กรุณาระบุ user_id')
        if (!listing_id) errors.push('กรุณาระบุ listing_id')
        if (errors.length > 0) {
            return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
        }
        const result = await Saved_listingsModel.create(req.body)
        res.json({ message: 'insert ok', data: result })

    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await Saved_listingsModel.update(req.params.id, req.body)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบ saved_listings' })
        }

        res.json({ message: 'update ok', data: result })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await Saved_listingsModel.remove(req.params.id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบ saved_listings' })
        }
        res.json({ message: 'delete ok', data: result })
    } catch (error) {
        next(error)
    }
}
module.exports = { getAll, getById, create,update, remove }