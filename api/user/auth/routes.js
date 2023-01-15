const express = require('express')
const router = express.Router()

const AuthenticationService = require('./AuthenticationService')
const verifyToken = require('../../../middleware/verifyToken')

router.post('/', AuthenticationService.login)
router.delete('/', verifyToken, AuthenticationService.logout)

module.exports = router
