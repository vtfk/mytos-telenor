const axios = require('axios')
const { logger } = require('@vtfk/logger')
const { writeFileSync, appendFileSync } = require('fs')
const HTTPError = require('../http-error')

const callMytos = async (options = {}) => {
  const { phoneNumber, method, payload } = options
  const { MYTOS: { URL_GET_USERS, URL_GET_USER, URL_UPDATE_USERS, USERNAME: username, PASSWORD: password } } = options.config
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
    config.url = URL_UPDATE_USERS
  }

  try {
    logger('info', ['mytos-data', method, 'start', config.url])
    const { data } = await axios(config)
    return data
  } catch (error) {
    const { status, message, data } = error.response
    logger('error', ['mytos-data', method, status, message || data])
    throw new HTTPError(status, message || data, error)
  }
}

module.exports.getMytosData = async options => {
  const { phoneNumber, DEMO, env, config } = options
  const data = await callMytos({
    phoneNumber,
    method: 'GET',
    config
  })

  const users = Array.isArray(data) ? data : [data]
  logger('info', ['mytos-data', 'GET', 'success', users.length])
  if (!DEMO) writeFileSync(`./data/mytos_${env}.json`, JSON.stringify(data, null, 2), 'utf8')
  else writeFileSync(`./data/demo/mytos_${env}.json`, JSON.stringify(data, null, 2), 'utf8')
  return users
}

module.exports.updateMytosData = async (options) => {
  const { payload, env, config } = options
  const data = await callMytos({
    method: 'PUT',
    payload,
    config
  })

  logger('info', ['mytos-data', 'PUT', data])
  appendFileSync(`./data/mytos_updateResult_${env}.txt`, `[${new Date().toISOString()}] - ${data}\r\n`, 'utf8')
}
