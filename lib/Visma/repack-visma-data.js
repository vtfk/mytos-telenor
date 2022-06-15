const { logger } = require('@vtfk/logger')
const hasData = require('../has-data')

const userPropsToRemove = [
  /* 'authentication',
  'careerInfo',
  'dateOfBirth',
  'dependents',
  'genderCode',
  'internationalId',
  'maritalStatus',
  'municipality',
  'nationalityCode',
  'postalAddress',
  'socialSecurityOffice' */
]

const employmentPropsToRemove = [
  /* 'bankDetails',
  'category',
  'company',
  'employmentPercentage',
  'lastEmployeed',
  'paymentInAdvance',
  'pension',
  'startDate',
  'statistics',
  'taxDetails',
  'union' */
]

const positionPropsToRemove = [
  /* 'benefits',
  'chart',
  'customId',
  'employmentPositionPercentage',
  'location',
  'positionCategoryNumber',
  'positionInfo',
  'positionPercentage',
  'positionStatistics',
  'salaryInfo',
  'seniorityDate',
  'shiftWork',
  'statistics',
  'taxDetails',
  'union',
  'weeklyHours',
  'workDaysInWeek',
  'yearlyHours' */
]

const fixedTransactionPropsToRemove = [
  'amount'
]

const repackFixedTransaction = fixedTransaction => {
  fixedTransactionPropsToRemove.forEach(prop => {
    delete fixedTransaction[prop]
  })

  return fixedTransaction
}

const repackPosition = position => {
  if (!position.costCentres) return {}
  if (!position.fixedTransactions || !position.fixedTransactions.fixedTransaction) return {}

  positionPropsToRemove.forEach(prop => {
    delete position[prop]
  })

  const obj = {
    costCentres: position.costCentres
  }

  if (Array.isArray(position.fixedTransactions.fixedTransaction)) {
    position.fixedTransactions.fixedTransaction.forEach(fixedTransaction => {
      if (fixedTransaction.payCode && fixedTransaction.payCode.toString() === '8380') {
        obj.fixedTransaction = repackFixedTransaction(fixedTransaction)
      }
    })
  } else {
    if (position.fixedTransactions.fixedTransaction.payCode && position.fixedTransactions.fixedTransaction.payCode.toString() === '8380') {
      obj.fixedTransaction = repackFixedTransaction(position.fixedTransactions.fixedTransaction)
    }
  }

  return obj.fixedTransaction ? obj : {}
}

const repackEmployment = employment => {
  // if no position
  if (!employment.positions || !employment.positions.position) return {}

  employmentPropsToRemove.forEach(prop => {
    delete employment[prop]
  })

  if (Array.isArray(employment.positions.position)) {
    for (const position of employment.positions.position) {
      const data = repackPosition(position)
      if (hasData(data)) return { employeeId: employment.employeeId, ...data }
    }
  } else {
    const data = repackPosition(employment.positions.position)
    if (hasData(data)) return { employeeId: employment.employeeId, ...data }
  }

  return {}
}

const repackContactInfo = contactInfo => {
  const repackPhone = phone => {
    phone = phone.toString().replace(/ /g, '')

    return phone
  }

  if (contactInfo.mobilePhone) {
    contactInfo.mobilePhone = repackPhone(contactInfo.mobilePhone)
  }
  if (contactInfo.privateMobilePhone) {
    contactInfo.privateMobilePhone = repackPhone(contactInfo.privateMobilePhone)
  }
  if (contactInfo.privatePhone) {
    contactInfo.privatePhone = repackPhone(contactInfo.privatePhone)
  }
  if (contactInfo.workPhone) {
    contactInfo.workPhone = repackPhone(contactInfo.workPhone)
  }

  return contactInfo
}

module.exports = data => {
  // return only people with phones registered and those with payCode 8380 (repacked)
  try {
    logger('info', ['repack-visma-data', 'start'])
    const employees = data.map(employee => {
      // if no contactInfo or no phones
      if (!employee.contactInfo || (!employee.contactInfo.mobilePhone && !employee.contactInfo.privateMobilePhone && !employee.contactInfo.privatePhone && !employee.contactInfo.workPhone)) return {}

      // remove user properties
      userPropsToRemove.forEach(prop => {
        delete employee[prop]
      })

      let obj = {
        contactInfo: repackContactInfo(employee.contactInfo)
      }

      // if no employment
      if (!employee.employments || !employee.employments.employment) return {}

      if (Array.isArray(employee.employments.employment)) {
        employee.employments.employment.forEach(employment => {
          const data = repackEmployment(employment)
          if (hasData(data)) {
            obj = { ...obj, ...data }
          }
        })
      } else {
        const data = repackEmployment(employee.employments.employment)
        if (hasData(data)) {
          obj = { ...obj, ...data }
        }
      }

      return hasData(obj, 2) ? obj : {}
    })

    const repackedEmployees = employees.filter(employee => hasData(employee))
    logger('info', ['repack-visma-data', 'finish', repackedEmployees.length])
    return repackedEmployees
  } catch (error) {
    logger('error', ['repack-visma-data', error])
    throw error
  }
}
