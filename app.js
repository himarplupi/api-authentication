const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')

// API Routes
const userRouter = require('./api/user/routes')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Register Service
app.use('/users', userRouter)

// Error Handling
app.use(errorHandler)

module.exports = app
