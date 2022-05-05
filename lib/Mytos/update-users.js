const { updateMytosData } = require('./mytos-data')

module.exports = async users => {
  // build payload to send to mytos
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

  return await updateMytosData(payload)
}
