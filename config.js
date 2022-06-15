require('dotenv').config()

module.exports = {
  VISMA: {
    URL: process.env.VISMA_URL,
    URL_NAME: process.env.VISMA_URL_NAME,
    URL_SSN: process.env.VISMA_URL_SSN,
    USERNAME: process.env.VISMA_USERNAME,
    PASSWORD: process.env.VISMA_PASSWORD
  },
  MYTOS: {
    URL_GET_USERS: process.env.MYTOS_URL_GET_USERS,
    URL_GET_USER: process.env.MYTOS_URL_GET_USER,
    URL_UPDATE_USERS: process.env.MYTOS_URL_UPDATE_USERS,
    USERNAME: process.env.MYTOS_USERNAME,
    PASSWORD: process.env.MYTOS_PASSWORD
  }
}
