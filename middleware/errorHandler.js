module.exports = (err, req, res, next) => {
  if (err.code === 'ECONNREFUSED') {
    return res.status(500).json({ status: 'error', message: 'service unavailable' })
  }

  const { status, data } = err.response
  return res.status(status).json(data)
}
