const getVismaData = require('../lib/Visma/get-visma-data')
const filterVismaData = require('../lib/Visma/filter-visma-data')
const { getMytosData, updateMytosData } = require('../lib/Mytos/mytos-data')
const generateResponse = require('../lib/generate-response')
const generateMytosPayload = require('../lib/Mytos/generate-mytos-payload')
const HTTPError = require('../lib/http-error')

module.exports = async function (context, req) {
  try {
    const results = await Promise.all([getVismaData(), getMytosData()])
    const visma = results[0]
    const mytos = results[1]
    const usersWithPhone = filterVismaData(visma, mytos)
    const mytosPayload = generateMytosPayload(usersWithPhone)
    const updated = await updateMytosData(mytosPayload)
    return generateResponse({
      updated,
      usersWithPhone,
      mytos,
      visma
    })
  } catch (error) {
    if (error instanceof HTTPError) return error.toJSON()

    const status = error.status || 400
    return generateResponse(error, status)
  }
}
