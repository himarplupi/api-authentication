const express = require('express')
const formidable = require('express-formidable')
const router = express.Router()

const UserService = require('./UserService')

const verifyToken = require('../../middleware/verifyToken')

// API Endpoint
router.use(verifyToken)

// User [auth]
router.get('/my', UserService.getUserAuth)
router.put('/my', formidable(), UserService.updateUserAuth)

router.get('/', UserService.getAll)
router.get('/:id', UserService.get)
router.post('/', UserService.create)

// User [admin]
router.put('/:id', formidable(), UserService.update)
router.delete('/:id', UserService.destroy)

module.exports = router
