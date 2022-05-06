const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const { VISMA: { URL, URL_NAME, URL_SSN, USERNAME: username, PASSWORD: password } } = require('../../config')
const HTTPError = require('../http-error')

module.exports = async (options = {}) => {
  const { firstName, lastName, ssn } = options
  const auth = {
    username,
    password
  }

  const config = {
    auth,
    method: 'GET'
  }
  if (firstName && lastName) {
    config.url = encodeURI(URL_NAME.replace('%firstname%', firstName).replace('%lastname%', lastName))
  } else if (ssn) {
    config.url = URL_SSN.replace('%ssn%', ssn)
  } else {
    config.url = URL
  }

  try {
    logger('info', ['get-data', config.url.substring(config.url.indexOf('persons') + 8)])
    const { data } = await axios(config)
    logger('info', ['get-data', 'success', data.length])
    return data
  } catch (error) {
    const { status, message, data } = error.response
    logger('error', ['get-data', status, message || data])
    throw new HTTPError(status, { code: error.code, message: message || data }, error)
  }
}
