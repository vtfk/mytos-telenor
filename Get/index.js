const getVismaData = require('../lib/Visma/get-visma-data')
const filterVismaData = require('../lib/Visma/filter-visma-data')
const getMytosData = require('../lib/Mytos/get-mytos-data')
const generateResponse = require('../lib/generate-response')

module.exports = async function (context, req) {
  try {
    const results = await Promise.all([getVismaData(), getMytosData()])
    const visma = results[0]
    const mytos = results[1]
    const usersWithPhone = filterVismaData(visma, mytos)
    return generateResponse({
      usersWithPhone,
      mytos,
      visma
    })
  } catch (error) {
    const status = error.status || 400
    return generateResponse(error, status)
  }
}
