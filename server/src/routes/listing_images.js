const express = require('express')
const router = express.Router()
const controller = require('../controllers/listing_images')
const upload = require('../config/multer') 


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', upload.single('image'), controller.create)
router.put('/:id', upload.single('image'), controller.update)
router.delete('/:id', controller.remove)


module.exports = router



