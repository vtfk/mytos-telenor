const { XMLParser } = require('fast-xml-parser')

module.exports = xmlData => {
  console.time('xml-to-json')
  const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: true,
    numberParseOptions: {
      leadingZeros: false
    }
  })

  const json = parser.parse(xmlData)
  console.timeEnd('xml-to-json')
  return json
}
