const express = require('express')
const router = express.Router()
const controller = require('../controllers/messages')

router.get('/', controller.getAllMessages)
router.get('/:id', controller.getMessagesById)
router.post('/', controller.createMessages)
router.put('/:id', controller.updateMessages)
router.delete('/:id', controller.removeMessages)

module.exports = router




