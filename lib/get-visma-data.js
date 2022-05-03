const axios = require('axios').default
const { VISMA: { URL, USERNAME: username, PASSWORD: password } } = require('../config')

module.exports = async () => {
  const headers = {
    auth: {
      username,
      password
    }
  }

  try {
    console.time('visma')
    const { data } = await axios.get(URL, headers)
    console.timeEnd('visma')
    return data
  } catch (error) {
    const { status, message } = error.response
    console.timeLog('visma', ['error', status, message])
    return false
  }
}
