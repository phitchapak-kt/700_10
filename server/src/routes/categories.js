const express = require('express')
const router = express.Router()
const controller = require('../controllers/categories')

router.get('/', controller.getAllCategories)
router.get('/:id', controller.getById)
router.post('/', controller.createCategory)
router.put('/:id', controller.updateCategory)
router.delete('/:id', controller.removeCategory)

module.exports = router

