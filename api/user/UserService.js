const FormData = require('form-data')
const fs = require('fs')

const apiAdapter = require('../../utils/ApiAdapter')
const { SERVICE_USER_URI } = process.env
const api = apiAdapter(SERVICE_USER_URI)

const getAll = async (req, res, next) => {
  try {
    const { data: response, status: statusCode } = await api.get('/users', {
      params: {
        ...req.query
      }
    })

    return res.status(statusCode).json(response)
  } catch (err) {
    next(err)
  }
}

const get = async (req, res, next) => {
  try {
    const { id: userId } = req.params
    const { data: response, status: statusCode } = await api.get(`/users/${userId}`)

    return res.json(statusCode, response)
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const { data: response, status: statusCode } = await api.post('/users', req.body)

    return res.json(statusCode, response)
  } catch (err) {
    next(err)
  }
}

/**
 * Update user profile by admin
 */
const update = async (req, res, next) => {
  const { id: userId } = req.params
  const { avatar } = req.files
  const { name, email, role } = req.fields
  const formData = new FormData()

  // Body payload
  name && formData.append('name', name)
  email && formData.append('email', email)
  role && formData.append('role', role)

  // Update Avatar (photo profile)
  if (avatar) {
    formData.append('avatar', fs.createReadStream(avatar.path), avatar.name)
  }

  try {
    const { data: response, status: statusCode } = await api.put(`/users/${userId}`, formData, {
      headers: {
        Authorization: req.token,
        'content-type': 'multipart/form-data; boundary=' + formData.getBoundary()
      }
    })

    return res.json(statusCode, response)
  } catch (err) {
    next(err)
  }
}

/**
 * Update user authenticated
 * OR update user profile
 */
const updateUserAuth = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const { avatar } = req.files
    const { name, email, password, confirm_password: confirmPassword } = req.fields
    const formData = new FormData()

    // Body payload
    name && formData.append('name', name)
    email && formData.append('email', email)

    // Update password
    password && formData.append('password', password)
    confirmPassword && formData.append('confirm_password', confirmPassword)

    // Update Avatar (photo profile)
    if (avatar) {
      formData.append('avatar', fs.createReadStream(avatar.path), avatar.name)
    }

    const { data: response, status: statusCode } = await api.put(`/users/${userId}`, formData, {
      headers: {
        Authorization: req.token,
        'content-type': 'multipart/form-data; boundary=' + formData.getBoundary()
      }
    })

    return res.json(statusCode, response)
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    const { id: userId } = req.params
    const { data: user } = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: req.token
      }
    })

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

/**
 * Get user authenticated
 */
const getUserAuth = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const { data: response, status: statusCode } = await api.get(`/users/${userId}`)

    res.json(statusCode, response)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll,
  get,
  create,
  update,
  destroy,
  getUserAuth,
  updateUserAuth
}
