const CategoriesModel = require('../models/categories')

const getAll = async (req, res, next) => {
  try {
    const categories = await CategoriesModel.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}


const getById = async (req, res, next) => {
  try {
    const categories = await CategoriesModel.findById(req.params.id)
    if (!categories) return res.status(404).json({ message: 'ไม่พบ categories' })
        res.json(categories)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {

    const { name} = req.body
    const errors = []
    if (!name) errors.push('กรุณากรอกชื่อ categories')
    if (errors.length > 0) {
        return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
    }
     const result = await CategoriesModel.create(req.body)
    res.json({ message: 'insert ok', data: result })

  } catch (error) {
    next(error)
  }
}


const update = async (req, res, next) => {
  try {
    const result = await CategoriesModel.update(req.params.id, req.body)

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบ categories' })
    }

    res.json({ message: 'update ok', data: result })
  } catch (error) {
    next(error)
  }
}


const remove = async (req, res, next) => {
  try {
    const result = await CategoriesModel.remove(req.params.id)
    res.json({ message: 'delete ok', data: result })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }