const getVismaData = require('../lib/get-visma-data')
const convertToJson = require('../lib/convert-xml-to-json.js')
const sanitize = require('../lib/sanitize-visma-data')

module.exports = async function (context, req) {
  const vismaData = await getVismaData()
  if (!vismaData) {
    return {
      status: 400,
      body: {
        message: 'Data ikke mottatt fra Visma'
      }
    }
  }

  // convert xml from Visma to JSON
  const vismaJson = await convertToJson(vismaData)
  if (!vismaJson) {
    return {
      status: 400,
      body: {
        message: 'Konvertering fra xml til json feilet'
      }
    }
  }

  const persons = Array.isArray(vismaJson.personsXML.person) ? vismaJson.personsXML.person : [vismaJson.personsXML.person]
  console.time('sanitize')
  const sanitized = sanitize(persons)
  console.timeEnd('sanitize')
  return {
    status: 200,
    body: sanitized
  }
}
