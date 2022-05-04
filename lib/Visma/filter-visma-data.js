const getPhoneString = phone => {
  if (!phone) return phone
  return phone.toString()
}

module.exports = (visma, mytos) => {
  return visma.filter(employee => {
    // return true if one of employee phones exist in mytos
    return mytos.find(customer => [getPhoneString(employee.contactInfo.mobilePhone), getPhoneString(employee.contactInfo.privateMobilePhone), getPhoneString(employee.contactInfo.privatePhone), getPhoneString(employee.contactInfo.workPhone)].includes(customer.Phonenumber))
  })
}
