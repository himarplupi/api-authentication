const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization
    if (!bearerHeader) {
      return res.json(403, {
        status: 'fail',
        message: 'Authorization is required'
      })
    }

    // Split key : Bearer
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY)
    req.user = decoded.data.user
    req.token = bearerHeader

    next()
  } catch (err) {
    return res.json(403, {
      status: 'fail',
      message: err.message
    })
  }
}
