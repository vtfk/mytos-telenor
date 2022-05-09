const { writeFileSync } = require('fs')
const getVismaData = require('./get-data')
const convertToJson = require('../convert-xml-to-json')
const repack = require('./repack-visma-data')

module.exports = async (options = {}) => {
  const { debug } = options
  const vismaData = await getVismaData(options)
  if (typeof vismaData !== 'string') throw vismaData
  if (debug) writeFileSync('./data/visma.xml', vismaData, 'utf8')

  const vismaJson = await convertToJson(vismaData)
  if (!vismaJson) throw new Error('Convertion from XML to JSON failed')
  if (debug) writeFileSync('./data/visma_raw.json', JSON.stringify(vismaJson, null, 2), 'utf8')

  const persons = Array.isArray(vismaJson.personsXML?.person || vismaJson.person) ? vismaJson.personsXML?.person || vismaJson.person : [vismaJson.personsXML?.person || vismaJson.person]
  const repacked = repack(persons)
  writeFileSync('./data/visma.json', JSON.stringify(repacked, null, 2), 'utf8')
  return repacked
}
