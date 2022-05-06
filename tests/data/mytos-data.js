const phoneNumber = "12345678"
const email = 'bjarne.betjent@vtfk.no'

const getJson = () => {
  return [
    {
      "Name": "Bjarne Betjent",
      "Phonenumber": phoneNumber,
      "EmployeeId": "01234",
      "Email": email,
      "DeptId": "00000000-8b38-0000-0000-0000000000ef",
      "DeptName": "VESTFOLD OG TELEMARK FYLKESKOMMUNE",
      "Dim1": "",
      "Dim2": "",
      "Dim3": "",
      "Dim4": "",
      "Dim5": "",
      "Roles": null,
      "IsReported": false,
      "Policies": []
    }
  ]
}

module.exports = {
  getJson,
  phoneNumber,
  email
}
