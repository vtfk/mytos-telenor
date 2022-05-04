const hasData = (data, length = 0) => Object.keys(data).length > length

const repackPosition = position => {
  // we only want employee primary position
  if (!position['@_isPrimaryPosition'] || position['@_isPrimaryPosition'].toLowerCase() !== 'true') return {}
  if (!position.costCentres) return {}
  if (!position.fixedTransactions || !position.fixedTransactions.fixedTransaction) return {}

  const obj = {
    costCentres: position.costCentres
  }

  if (Array.isArray(position.fixedTransactions.fixedTransaction)) {
    position.fixedTransactions.fixedTransaction.forEach(fixedTransaction => {
      if (fixedTransaction.payCode && fixedTransaction.payCode.toString() === '8380') {
        obj.fixedTransaction = fixedTransaction
      }
    })
  } else {
    if (position.fixedTransactions.fixedTransaction.payCode && position.fixedTransactions.fixedTransaction.payCode.toString() === '8380') {
      obj.fixedTransaction = position.fixedTransactions.fixedTransaction
    }
  }

  return obj.fixedTransaction ? obj : {}
}

const repackEmployment = employment => {
  // if no position
  if (!employment.positions || !employment.positions.position) return {}

  if (Array.isArray(employment.positions.position)) {
    for (const position of employment.positions.position) {
      const data = repackPosition(position)
      if (hasData(data)) return data
    }
  } else {
    const data = repackPosition(employment.positions.position)
    if (hasData(data)) return data
  }

  return {}
}

module.exports = data => {
  const employees = data.map(employee => {
    // if no contactInfo or no phones
    if (!employee.contactInfo || (!employee.contactInfo.mobilePhone && !employee.contactInfo.privateMobilePhone && !employee.contactInfo.privatePhone && !employee.contactInfo.workPhone)) return {}
    let obj = {
      contactInfo: employee.contactInfo,
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

  return employees.filter(employee => hasData(employee))
}
