const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const { MYTOS: { URL_GET_USERS, URL_GET_USER, USERNAME: username, PASSWORD: password } } = require('../../config')

module.exports = async phoneNumber => {
  const headers = {
    auth: {
      username,
      password
    }
  }

  try {
    console.time('mytos')
    logger('info', ['get-mytos-data', phoneNumber || 'all'])
    const { data } = await axios.get(phoneNumber ? `${URL_GET_USER.replace('%phoneNumber%', phoneNumber)}` : URL_GET_USERS, headers)
    const users = Array.isArray(data) ? data : [data]
    logger('info', ['get-mytos-data', 'success', users.length])
    console.timeEnd('mytos')
    return users
  } catch (error) {
    const { status, message, data } = error.response
    console.timeEnd('mytos')
    logger('error', ['get-mytos-data', status, message || data])
    throw {
      code: error.code,
      status,
      message: message || data
    }
  }
}
