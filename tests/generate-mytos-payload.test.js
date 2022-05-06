const { logConfig } = require('@vtfk/logger')
const converter = require('../lib/convert-xml-to-json')
const { getXml } = require('./data/visma-data')
const repack = require('../lib/Visma/repack-visma-data')
const { getJson, phoneNumber, email } = require('./data/mytos-data')
const filterData = require('../lib/Visma/filter-visma-data')
const generatePayload = require('../lib/Mytos/generate-mytos-payload')

logConfig({
  localLogger: () => {}
})

const json = converter(getXml())
const persons = Array.isArray(json.personsXML.person) ? json.personsXML.person : [json.personsXML.person]
const repacked = repack(persons)
const filtered = filterData(repacked, getJson())
const payload = generatePayload(filtered)

describe('Generating payload', () => {
  test('Should return a Array', () => {
    expect(Array.isArray(payload)).toBeTruthy()
  })

  describe('Each user should have', () => {
    test('"Phonenumber" property of type string', () => {
      expect(typeof payload[0].Phonenumber).toBe('string')
      expect(payload[0].Phonenumber).toBe(phoneNumber)
    })

    test('"Email" property of type string', () => {
      expect(typeof payload[0].Email).toBe('string')
      expect(payload[0].Email).toBe(email)
    })

    test('"Dim1" property of type string', () => {
      expect(typeof payload[0].Dim1).toBe('string')
    })

    test('"Dim2" property of type string', () => {
      expect(typeof payload[0].Dim2).toBe('string')
    })
  })
})
