module.exports = (err, req, res, next) => {
  if (err.code === 'ECONNREFUSED') {
    return res.status(500).json({ status: 'error', message: 'service unavailable' })
  }

  const { status = 'fail', message = 'internal server error' } = err.response?.data

  return res.json(err.response?.status || 500, {
    status,
    message
  })
}
