const { logger } = require('@vtfk/logger')
const { updateMytosData } = require('./mytos-data')

module.exports = async users => {
  // build payload to send to mytos
  try {
    logger('info', ['update-users', 'generating payload', 'start'])
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
    logger('info', ['update-users', 'generating payload', 'finish', payload.length])

    return await updateMytosData(payload)
  } catch (error) {
    logger('error', ['update-users', error])
    throw error
  }
}
