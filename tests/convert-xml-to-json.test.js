const { logConfig } = require('@vtfk/logger')
const converter = require('../lib/convert-xml-to-json')
const { getXml, personIdHRM, email, mobilePhone, workPhone } = require('./data/visma-data')

logConfig({
  localLogger: () => {}
})

const xml = getXml()
const result = converter(xml)

describe('Convertion to JSON', () => {
  test('Should return a valid JSON', () => {
    const validator = () => JSON.stringify(result)
    expect(typeof validator()).toBe('string')
  })

  test('"person" has "personIdHRM" of correct type', () => {
    expect(typeof result.personsXML.person).toBe('object')
    expect(typeof result.personsXML.person['@_personIdHRM']).toBe('string')
    expect(result.personsXML.person['@_personIdHRM']).toBe(personIdHRM)
  })

  test('"contactInfo" has "email" of correct type', () => {
    expect(typeof result.personsXML.person.contactInfo).toBe('object')
    expect(typeof result.personsXML.person.contactInfo.email).toBe('string')
    expect(result.personsXML.person.contactInfo.email).toBe(email)
  })

  test('"contactInfo" has "mobilePhone" of correct type', () => {
    expect(typeof result.personsXML.person.contactInfo).toBe('object')
    expect(typeof result.personsXML.person.contactInfo.mobilePhone).toBe('number')
    expect(result.personsXML.person.contactInfo.mobilePhone).toBe(mobilePhone)
  })

  test('"contactInfo" has "workPhone" of correct type', () => {
    expect(typeof result.personsXML.person.contactInfo).toBe('object')
    expect(typeof result.personsXML.person.contactInfo.workPhone).toBe('string')
    expect(result.personsXML.person.contactInfo.workPhone).toBe(workPhone)
  })
})
