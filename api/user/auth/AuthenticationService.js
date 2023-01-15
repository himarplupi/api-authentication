const apiAdapter = require('../../../utils/ApiAdapter')
const { SERVICE_USER_URI } = process.env
const api = apiAdapter(SERVICE_USER_URI)

const login = async (req, res, next) => {
  try {
    const { data: auth } = await api.post('/auth', req.body)

    return res.json(auth)
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const { data: auth } = await api.delete('/auth', {
      headers: {
        Authorization: authorization
      }
    })

    return res.json(auth)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  login, logout
}
