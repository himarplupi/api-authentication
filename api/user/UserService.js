const apiAdapter = require('../../utils/ApiAdapter')
const { SERVICE_USER_URI } = process.env
const api = apiAdapter(SERVICE_USER_URI)

const getAll = async (req, res, next) => {
  try {
    const { data: users } = await api.get('/users', {
      params: {
        ...req.query
      }
    })

    return res.json(users)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll
}
