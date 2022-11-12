const express = require('express')
const router = express.Router()

const UserService = require('./UserService')

// API Endpoint
router.get('/', UserService.getAll)

module.exports = router
