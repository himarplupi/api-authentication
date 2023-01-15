const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
// const formidable = require('express-formidable')

require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')

// API Routes
const userRouter = require('./api/user/routes')
const authRouter = require('./api/user/auth/routes')

const app = express()

app.use(cors())
app.use(logger('dev'))
// app.use(formidable())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Register Service
app.use('/users', userRouter)
app.use('/auth', authRouter)

// Error Handling
app.use(errorHandler)

module.exports = app
