const Listing_imagesModel = require('../models/listing_images')

const getAll = async (req, res, next) => {
    try {
        const listing_images = await Listing_imagesModel.findAll()
        res.json(listing_images)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const listing_images = await Listing_imagesModel.findById(req.params.id)
        if (!listing_images) return res.status(404).json({ message: 'ไม่พบ listing_images' })
        res.json(listing_images)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {

        const { listing_id, image_order } = req.body
        const image_url = req.file ? req.file.filename : null

        const errors = []
        if (!listing_id) errors.push('กรุณาระบุ listing_id')
        if (!image_url) errors.push('กรุณาใส่รูป image_url')
        if (!image_order) errors.push('กรุณาระบุ image_order')

        if (errors.length > 0) {
            return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
        }
        const result = await Listing_imagesModel.create({
            listing_id,
            image_url,
            image_order
        })
        res.json({ message: 'insert ok', data: result })

    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { listing_id, image_order } = req.body
        const image_url = req.file ? req.file.filename : null
        if (!image_url) {
            return res.status(400).json({ message: 'กรุณาแนบรูปภาพ' })
        }

         const result = await Listing_imagesModel.update(req.params.id, {
            listing_id,
            image_url,
            image_order
        })


        res.json({ message: 'update ok', data: result })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await Listing_imagesModel.remove(req.params.id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบ listing_images' })
        }
        res.json({ message: 'delete ok', data: result })
    } catch (error) {
        next(error)
    }
}



module.exports = { getAll, getById, create, update, remove }