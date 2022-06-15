require('dotenv').config()

/**
 * @typedef {Object} VismaConfig
 * @property {String} URL Url to Visma API for getting users by employeeId
 * @property {String} URL_NAME Url to Visma API for getting users by name
 * @property {String} URL_SSN Url to Visma API for getting users by ssn
 * @property {String} USERNAME Username to Visma API
 * @property {String} PASSWORD Password to Visma API
 */

/**
 * @typedef {Object} MytosConfig
 * @property {String} URL_GET_USERS Url to Mytos API for getting users
 * @property {String} URL_GET_USER Url to Mytos API for getting one user
 * @property {String} URL_UPDATE_USERS Url to Mytos API for updating users
 * @property {String} USERNAME Username to Mytos API
 * @property {String} PASSWORD Password to Mytos API
 */

/**
 * @typedef {Object} ConfigObject
 * @property {VismaConfig} VISMA
 * @property {MytosConfig} MYTOS
 */

/**
 * 
 * @param {String} env "PROD" | "TEST" - Which environment to use
 * @param {String} visma "ALL" | "SELECTED" - Which Visma URL to use. If not passed, "ALL" will be used
 * @returns {ConfigObject} Configobject
 */
module.exports = (env, visma = "ALL") => {
  return {
    VISMA: {
      URL: visma === 'ALL' ? process.env.ALL_VISMA_URL : process.env.SELECTED_VISMA_URL,
      URL_NAME: process.env.VISMA_URL_NAME,
      URL_SSN: process.env.VISMA_URL_SSN,
      USERNAME: process.env.VISMA_USERNAME,
      PASSWORD: process.env.VISMA_PASSWORD
    },
    MYTOS: {
      URL_GET_USERS: process.env.MYTOS_URL_GET_USERS,
      URL_GET_USER: process.env.MYTOS_URL_GET_USER,
      URL_UPDATE_USERS: process.env.MYTOS_URL_UPDATE_USERS,
      USERNAME: env === 'PROD' ? process.env.PROD_MYTOS_USERNAME : process.env.TEST_MYTOS_USERNAME,
      PASSWORD: env === 'PROD' ? process.env.PROD_MYTOS_PASSWORD : process.env.TEST_MYTOS_PASSWORD
    }
  }
}
