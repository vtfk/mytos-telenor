const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const { MYTOS: { URL_GET_USERS, URL_GET_USER, URL_UPDATE_USERS, URL_UPDATE_USER, USERNAME: username, PASSWORD: password } } = require('../../config')

const callMytos = async (options = {}) => {
  const { phoneNumber, method, payload } = options
  const auth = {
    username,
    password
  }

  const config = {
    auth,
    method
  }
  if (payload) {
    config.data = payload
  }
  if (method === 'GET') {
    config.url = phoneNumber ? `${URL_GET_USER.replace('%phoneNumber%', phoneNumber)}` : URL_GET_USERS
  } else if (method === 'PUT') {
    config.url = Array.isArray(payload) ? URL_UPDATE_USERS : URL_UPDATE_USER
  }

  try {
    logger('info', ['mytos-data', method, 'start', config.url])
    const { data } = await axios(config)
    return data
  } catch (error) {
    const { status, message, data } = error.response
    logger('error', ['mytos-data', method, status, message || data])
    throw {
      code: error.code,
      status,
      message: message || data
    }
  }
}

module.exports.getMytosData = async phoneNumber => {
  const data = await callMytos({
    phoneNumber,
    method: 'GET'
  })

  const users = Array.isArray(data) ? data : [data]
  logger('info', ['mytos-data', 'GET', 'success', users.length])
  return users
}

module.exports.updateMytosData = async payload => {
  const data = await callMytos({
    method: 'PUT',
    payload
  })

  logger('info', ['mytos-data', 'PUT', data])
  return data
}