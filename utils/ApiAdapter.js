const axios = require('axios')
const { TIMEOUT } = process.env

/**
 * Fungsi konfigurasi axios
 * @param {*} baseURL : root path enpoint service
 * @returns axios instance
 * docs: https://axios-http.com/docs/instance
 */

module.exports = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: TIMEOUT || 5000 // 5s
  })
}
