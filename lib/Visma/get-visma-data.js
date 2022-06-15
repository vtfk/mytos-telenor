const { writeFileSync } = require('fs')
const { logger } = require('@vtfk/logger')
const getVismaData = require('./get-data')
const convertToJson = require('../convert-xml-to-json')
const repack = require('./repack-visma-data')

module.exports = async (options = {}) => {
  const { debug, DEMO, env } = options
  const vismaData = await getVismaData(options)
  if (typeof vismaData !== 'string') throw vismaData
  if (debug) writeFileSync(`./data/debug/visma_${env}.xml`, vismaData, 'utf8')

  const vismaJson = await convertToJson(vismaData)
  if (!vismaJson) throw new Error('Convertion from XML to JSON failed')
  if (debug) writeFileSync(`./data/debug/visma_raw_${env}.json`, JSON.stringify(vismaJson, null, 2), 'utf8')

  const persons = Array.isArray(vismaJson.personsXML?.person || vismaJson.person) ? vismaJson.personsXML?.person || vismaJson.person : [vismaJson.personsXML?.person || vismaJson.person]
  logger('info', ['get-visma-data', 'total entries', persons.length])
  const repacked = repack(persons)
  logger('info', ['get-visma-data', 'repacked entries', repacked.length])
  if (!DEMO) writeFileSync(`./data/visma_${env}.json`, JSON.stringify(repacked, null, 2), 'utf8')
  else writeFileSync(`./data/demo/visma_${env}.json`, JSON.stringify(repacked, null, 2), 'utf8')
  return repacked
}
