const getVismaData = require('./get-data')
const convertToJson = require('../convert-xml-to-json')
const sanitize = require('./sanitize-visma-data')
const { logger } = require('@vtfk/logger')

module.exports = async () => {
  let vismaData
  try {
    vismaData = await getVismaData()
    if (typeof vismaData !== 'string') throw vismaData
  } catch (error) {
    throw error
  }

  // convert xml to JSON
  let vismaJson
  try {
    vismaJson = await convertToJson(vismaData)
    if (!vismaJson) throw new Error('Convertion from XML to JSON failed')
  } catch (error) {
    logger('error', ['get-visma-data', 'convert-to-json', error])
    throw error
  }

  // remove properties we don't need. Will speed up the process later on
  try {
    const persons = Array.isArray(vismaJson.personsXML.person) ? vismaJson.personsXML.person : [vismaJson.personsXML.person]
    console.time('sanitize')
    const sanitized = sanitize(persons)
    console.timeEnd('sanitize')
    return sanitized
  } catch (error) {
    logger('error', ['get-visma-data', 'sanitize', error])
    throw error
  }
}
