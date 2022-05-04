const userPropsToRemove = [
  'authentication',
  'careerInfo',
  'dateOfBirth',
  'dependents',
  'genderCode',
  'internationalId',
  'maritalStatus',
  'municipality',
  'nationalityCode',
  'postalAddress',
  'socialSecurityOffice'
]

const employmentPropsToRemove = [
  'bankDetails',
  'category',
  'company',
  'employmentPercentage',
  'lastEmployeed',
  'paymentInAdvance',
  'pension',
  'startDate',
  'statistics',
  'taxDetails',
  'union'
]

const positionPropsToRemove = [
  'benefits',
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
  'yearlyHours'
]

const fixedTransactionPropsToRemove = [
  'amount'
]

const sanitizeFixedTransaction = fixedTransaction => {
  fixedTransactionPropsToRemove.forEach(prop => {
    delete fixedTransaction[prop]
  })

  return fixedTransaction
}

const sanitizePosition = position => {
  positionPropsToRemove.forEach(prop => {
    delete position[prop]
  })

  // remove fixedTransaction properties
  if (position.fixedTransactions?.fixedTransaction) {
    if (Array.isArray(position.fixedTransactions.fixedTransaction)) {
      // multiple fixedTransactions
      position.fixedTransactions.fixedTransaction.forEach(fixedTransaction => {
        fixedTransaction = sanitizeFixedTransaction(fixedTransaction)
      })
    } else {
      // one fixedTransaction
      position.fixedTransactions.fixedTransaction = sanitizeFixedTransaction(position.fixedTransactions.fixedTransaction)
    }
  }

  return position
}

const sanitizeEmployment = employment => {
  employmentPropsToRemove.forEach(prop => {
    delete employment[prop]
  })

  // remove position properties
  if (employment.positions?.position) {
    if (Array.isArray(employment.positions.position)) {
      // multiple positions
      employment.positions.position.forEach(position => {
        position = sanitizePosition(position)
      })
    } else {
      // one position
      employment.positions.position = sanitizePosition(employment.positions.position)
    }
  }

  return employment
}

module.exports = data => {
  data.forEach(employee => {
    // remove user properties
    userPropsToRemove.forEach(prop => {
      delete employee[prop]
    })

    // remove employment properties
    if (employee.employments?.employment) {
      if (Array.isArray(employee.employments.employment)) {
        // multiple employments
        employee.employments.employment.forEach(employment => {
          employment = sanitizeEmployment(employment)
        })
      } else {
        // one employment
        employee.employments.employment = sanitizeEmployment(employee.employments.employment)
      }
    }
  })

  return data
}
