const { logger } = require('@vtfk/logger')
const hasData = require('../has-data')

const getPhoneString = phone => {
  if (!phone) return phone
  return phone.toString().replace(/ /g, '')
}

module.exports = (visma, mytos) => {
  try {
    logger('info', ['filter-visma-data', 'start'])
    const users = visma.map(employee => {
      // find user in mytos by one of employee phones
      const user = mytos.find(customer => [getPhoneString(employee.contactInfo.mobilePhone), getPhoneString(employee.contactInfo.privateMobilePhone), getPhoneString(employee.contactInfo.privatePhone), getPhoneString(employee.contactInfo.workPhone)].includes(customer.Phonenumber))
      if (!user) return {}

      // add phonenumber used in mytos to object. this will be the identificator we need to use when updating user in mytos
      const { Phonenumber } = user
      return { Phonenumber, ...employee }
    })

    const filtered = users.filter(user => hasData(user))
    logger('info', ['filter-visma-data', 'finish', filtered.length])
    return filtered
  } catch (error) {
    logger('error', ['filtered-visma-data', error])
    throw error
  }
}
