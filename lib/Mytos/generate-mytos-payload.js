const { logger } = require('@vtfk/logger')
const { writeFileSync } = require('fs')

module.exports = options => {
  const { users, DEMO, env } = options
  // build payload to send to mytos
  try {
    logger('info', ['generate-mytos-payload', 'start'])
    const payload = users.map(user => {
      const obj = {
        Phonenumber: user.Phonenumber,
        Email: user.contactInfo.email,
        EmployeeId: `${user.employeeId}`
      }

      Object.values(user.costCentres).forEach((costCentre, index) => {
        obj[`Dim${index + 1}`] = costCentre['@_value']
      })

      return obj
    })
    logger('info', ['generate-mytos-payload', 'finish', payload.length])
    if (!DEMO) writeFileSync(`./data/payload_${env}.json`, JSON.stringify(payload, null, 2), 'utf8')
    else writeFileSync(`./data/demo/payload_${env}.json`, JSON.stringify(payload, null, 2), 'utf8')

    return payload
  } catch (error) {
    logger('error', ['generate-mytos-payload', error])
    throw error
  }
}
