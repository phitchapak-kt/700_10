const CategoriesModel = require('../models/categories')

const getAllCategories = async (req, res, next) => {     // ดึงหมวดทั้งหมด
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

    if (!categories) {
      return res.status(404).json({ message: 'ไม่พบ categories' })
    }
    res.json(categories)

  } catch (error) {
    next(error)
  }
}

const createCategory = async (req, res, next) => {   //// (admin) เพิ่มหมวด
  try {

    const { name} = req.body
    const errors = []
    if (!name) errors.push('กรุณากรอกชื่อ categories')
    if (errors.length > 0) {
        return res.status(400).json({ message: 'กรุณากรอกชื่อหมวดหมู่'})
    }

    const result = await CategoriesModel.create({ name })
    res.json({ message: 'เพิ่มข้อมูลสำเร็จ', data: result })

  } catch (error) {
    next(error)
  }
}


const updateCategory = async (req, res, next) => {            // แก้ไข
  try {
     const { name } = req.body


     // 🔥 เพิ่ม validation
    if (!name) {
      return res.status(400).json({ message: 'กรุณากรอกชื่อ categories' })
    }

    const result = await CategoriesModel.update(req.params.id, { name })

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบ categories' })
    }

    res.json({ message: 'แก้ไขข้อมูลสำเร็จ', data: result })
  } catch (error) {
    next(error)
  }
}


const removeCategory = async (req, res, next) => {         // ลบ
  try {
    const result = await CategoriesModel.remove(req.params.id)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบ categories' })
    }
    res.json({ message: 'delete ok', data: result })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllCategories, getById,createCategory,updateCategory, removeCategory }