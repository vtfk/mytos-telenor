const getVismaData = require('./get-data')
const convertToJson = require('../convert-xml-to-json')
const repack = require('./repack-visma-data')

module.exports = async options => {
  const vismaData = await getVismaData(options)
  if (typeof vismaData !== 'string') throw vismaData

  const vismaJson = await convertToJson(vismaData)
  if (!vismaJson) throw new Error('Convertion from XML to JSON failed')

  const persons = Array.isArray(vismaJson.personsXML?.person || vismaJson.person) ? vismaJson.personsXML?.person || vismaJson.person : [vismaJson.personsXML?.person || vismaJson.person]
  const repacked = repack(persons)
  return repacked
}
