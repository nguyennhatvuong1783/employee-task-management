const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')

router.post('/createNewAccessCode', authController.createNewAccessCode)
router.post('/validateAccessCode', authController.validateAccessCode)

module.exports = router
