const { logger } = require('@vtfk/logger')
const { XMLParser } = require('fast-xml-parser')

module.exports = xmlData => {
  try {
    logger('info', ['convert-xml-to-json', 'start'])
    const parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: true,
      numberParseOptions: {
        leadingZeros: false
      }
    })

    const json = parser.parse(xmlData)
    logger('info', ['convert-xml-to-json', 'finish'])
    return json
  } catch (error) {
    logger('error', ['convert-xml-to-json', error])
    throw error
  }
}
