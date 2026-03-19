const express = require('express')
const router = express.Router()
const controller = require('../controllers/conversations'); 


router.get('/', controller.getAllConversation)
router.get('/:id', controller.getConversationById)
router.post('/', controller.createorGetConversation)
router.put('/:id', controller.updateConversationStatus)
router.delete('/:id', controller.removeConversation)

module.exports = router


