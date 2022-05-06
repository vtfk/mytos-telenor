const { logConfig } = require('@vtfk/logger')
const converter = require('../lib/convert-xml-to-json')
const { getXml } = require('./data/visma-data')
const repack = require('../lib/Visma/repack-visma-data')

logConfig({
  localLogger: () => {}
})

const json = converter(getXml())
const persons = Array.isArray(json.personsXML.person) ? json.personsXML.person : [json.personsXML.person]
const repacked = repack(persons)

describe('Repack visma data', () => {
  test('Should return a list of employees', () => {
    expect(Array.isArray(repacked)).toBe(true)
  })

  test('Should have "contactInfo"', () => {
    expect(typeof repacked[0].contactInfo).toBe('object')
  })

  test('Should have "costCentres"', () => {
    expect(typeof repacked[0].costCentres).toBe('object')
  })

  test('Should have "fixedTransaction"', () => {
    expect(typeof repacked[0].fixedTransaction).toBe('object')
  })

  test('"fixedTransaction" should have payCode 8380', () => {
    expect(repacked[0].fixedTransaction.payCode).toBe(8380)
  })
})
