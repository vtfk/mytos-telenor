const { logConfig } = require('@vtfk/logger')
const converter = require('../lib/convert-xml-to-json')
const { getXml } = require('./data/visma-data')
const repack = require('../lib/Visma/repack-visma-data')
const { getJson, phoneNumber } = require('./data/mytos-data')
const filterData = require('../lib/Visma/filter-visma-data')

logConfig({
  localLogger: () => {}
})

const json = converter(getXml())
const persons = Array.isArray(json.personsXML.person) ? json.personsXML.person : [json.personsXML.person]
const repacked = repack(persons)
const filtered = filterData(repacked, getJson())

describe('Filtering Visma data', () => {
  test('Should return a Array', () => {
    expect(Array.isArray(filtered)).toBeTruthy()
  })

  describe('Each user should have', () => {
    test('"Phonenumber" property of type string', () => {
      expect(typeof filtered[0].Phonenumber).toBe('string')
      expect(filtered[0].Phonenumber).toBe(phoneNumber)
    })

    test('"contactInfo" property of type object', () => {
      expect(typeof filtered[0].contactInfo).toBe('object')
    })

    test('"costCentres" property of type object', () => {
      expect(typeof filtered[0].costCentres).toBe('object')
    })

    test('"fixedTransaction" property of type object', () => {
      expect(typeof filtered[0].fixedTransaction).toBe('object')
    })
  })
})
