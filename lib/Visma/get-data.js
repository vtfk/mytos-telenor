const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const { VISMA: { URL, USERNAME: username, PASSWORD: password } } = require('../../config')

module.exports = async () => {
  const headers = {
    auth: {
      username,
      password
    }
  }

  try {
    logger('info', ['get-data', URL.substring(URL.indexOf('persons') + 8)])
    const { data } = await axios.get(URL, headers)
    logger('info', ['get-data', 'success', data.length])
    return data
  } catch (error) {
    const { status, message, data } = error.response
    logger('error', ['get-data', status, message || data])
    throw {
      code: error.code,
      status,
      message: message || data
    }
  }
}
