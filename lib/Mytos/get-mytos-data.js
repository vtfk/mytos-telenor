const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const { MYTOS: { URL_GET_USERS, URL_GET_USER, USERNAME: username, PASSWORD: password } } = require('../../config')

module.exports = async () => {
  const headers = {
    auth: {
      username,
      password
    }
  }

  try {
    console.time('mytos')
    const { data } = await axios.get(URL_GET_USER, headers)
    console.timeEnd('mytos')
    return data
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
