const { logger } = require('@vtfk/logger')

module.exports = users => {
  // build payload to send to mytos
  try {
    logger('info', ['generate-mytos-payload', 'start'])
    const payload = users.map(user => {
      const obj = {
        Phonenumber: user.Phonenumber,
        Email: user.contactInfo.email
      }

      Object.values(user.costCentres).forEach((costCentre, index) => {
        obj[`Dim${index + 1}`] = costCentre['@_value']
      })

      return obj
    })
    logger('info', ['generate-mytos-payload', 'finish', payload.length])

    return payload
  } catch (error) {
    logger('error', ['generate-mytos-payload', error])
    throw error
  }
}
