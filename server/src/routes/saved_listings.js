const express = require('express')
const router = express.Router()
const controller = require('../controllers/saved_listings')

router.get('/', controller.getAllSave)
router.get('/user/:user_id', controller.getByUserSaveId)
router.post('/', controller.createSave)
router.delete('/:id', controller.removeSave)

module.exports = router


