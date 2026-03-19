const ListingsModel = require('../models/listings')

const getAll = async (req, res, next) => {
  try {
    const listings = await ListingsModel.findAll()
    res.json(listings)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const listings = await ListingsModel.findById(req.params.id)
    if (!listings) return res.status(404).json({ message: 'ไม่พบ listings' })
        res.json(listings)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {

    const { title, user_id} = req.body
    const errors = []
    if (!title) errors.push('กรุณากรอกชื่อ สินค้า')
    if (!user_id) errors.push('กรุณาระบุ user_id')
    if (errors.length > 0) {
        return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
    }
     const result = await ListingsModel.create(req.body)
    res.json({ message: 'insert ok', data: result })

  } catch (error) {
    next(error)
  }
}


const update = async (req, res, next) => {
  try {
    const result = await ListingsModel.update(req.params.id, req.body)

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบ listings' })
    }

    res.json({ message: 'update ok', data: result })
  } catch (error) {
    next(error)
  }
}


const remove = async (req, res, next) => {  //ลบid
  try {
    const result = await ListingsModel.remove(req.params.id)
    res.json({ message: 'delete ok', data: result })
  } catch (error) {
    next(error)
  }
}



module.exports = { getAll, getById, create, update, remove}

