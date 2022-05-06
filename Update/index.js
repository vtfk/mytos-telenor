const { logConfig } = require('@vtfk/logger')
const { DEMO } = require('../config')
const getVismaData = require('../lib/Visma/get-visma-data')
const filterVismaData = require('../lib/Visma/filter-visma-data')
const { getMytosData, updateMytosData } = require('../lib/Mytos/mytos-data')
const generateResponse = require('../lib/generate-response')
const generateMytosPayload = require('../lib/Mytos/generate-mytos-payload')
const HTTPError = require('../lib/http-error')

module.exports = async function (context, req) {
  try {
    const data = {}
    if (DEMO) {
      logConfig({
        prefix: 'DEMO'
      })

      data.visma = require('../data/visma_all.json')
      data.mytos = require('../data/mytos_all.json')
    }

    if (!data.visma && !data.mytos) {
      const results = await Promise.all([getVismaData(), getMytosData()])
      data.visma = results[0]
      data.mytos = results[1]
    }

    const usersWithPhone = filterVismaData(data.visma, data.mytos)
    const mytosPayload = generateMytosPayload(usersWithPhone)
    const updated = await updateMytosData(mytosPayload)
    return generateResponse({
      updated,
      mytosPayload,
      mytos: data.mytos,
      visma: data.visma
    })
  } catch (error) {
    if (error instanceof HTTPError) return error.toJSON()

    const status = error.status || 400
    return generateResponse(error, status)
  }
}
