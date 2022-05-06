const personIdHRM = '01234'
const email = 'bjarne.betjent@vtfk.no'
const mobilePhone = 12345678
const workPhone = '01234567'

const getXml = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<personsXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <person personIdHRM="${personIdHRM}">
    <careerInfo/>
    <contactInfo>
      <email>${email}</email>
      <mobilePhone>${mobilePhone}</mobilePhone>
      <workPhone>${workPhone}</workPhone>
    </contactInfo>
    <dateOfBirth>1983-05-12</dateOfBirth>
    <dependents>
      <dependent>
        <aloneWithChild>false</aloneWithChild>
        <birthYear>1973-09-27</birthYear>
        <chronicallyIll>false</chronicallyIll>
        <contactInfo>
          <privatePhone></privatePhone>
        </contactInfo>
        <name></name>
        <postalAddress>
          <address1></address1>
          <countryCode></countryCode>
          <postalArea></postalArea>
          <postalCode></postalCode>
        </postalAddress>
        <primary></primary>
        <relation></relation>
      </dependent>
    </dependents>
    <employments>
      <employment>
        <bankDetails>
          <accountNumber></accountNumber>
          <alias>Hovedkonto</alias>
          <nationalityCode>NO</nationalityCode>
        </bankDetails>
        <category id="F">
          <description>Fast ansatt</description>
        </category>
        <company>
          <companyId>1</companyId>
          <companyName>Vestfold og Telemark fylkeskommune</companyName>
          <organizationNumber>821227062</organizationNumber>
        </company>
        <employeeId>01234567</employeeId>
        <employmentPercentage>100.0</employmentPercentage>
        <lastChangedDate>2022-05-03T08:16:09</lastChangedDate>
        <lastEmployeed>2020-05-01</lastEmployeed>
        <paymentInAdvance>0.00</paymentInAdvance>
        <positions>
          <position isPrimaryPosition="true" validFromDate="2022-03-01">
            <chart id="4" name="Vestfold og Telemark fylkeskommune">
              <unit id="11200" name="Teknologi og digitalisering">
                <manager id="00000" name="Vegar Beider"/>
                <roles/>
              </unit>
            </chart>
            <costCentres>
              <dimension2 name="Teknologi og digitalisering" value="15320"/>
              <dimension3 name="Administrasjon" value="420"/>
            </costCentres>
            <employmentPositionPercentage>100.0</employmentPositionPercentage>
            <fixedTransactions>
              <fixedTransaction uniqueKey="00000">
                <amount>10000000000000</amount>
                <costCentres/>
                <number>0.00</number>
                <payCode>100</payCode>
                <rate>0.00</rate>
                <type name="AUTOMATIC" value="A"/>
              </fixedTransaction>
              <fixedTransaction uniqueKey="00000">
                <amount>366.00</amount>
                <costCentres/>
                <number>0.00</number>
                <payCode>8380</payCode>
                <rate>0.00</rate>
                <type name="AUTOMATIC" value="A"/>
              </fixedTransaction>
            </fixedTransactions>
            <lastChangedDate>2022-04-01T12:27:47</lastChangedDate>
            <leave/>
            <location name="Fylkeshuset i Tønsberg" value="2"/>
            <positionCategoryNumber>1</positionCategoryNumber>
            <positionInfo>
              <positionCode name="Rådgiver" positionCode="8530" positionId="3" tableNr="50"/>
              <positionType name="Fast ansatt" value="FA"/>
              <publicPositionCode name="Rådgiver" value="8530">
                <set>KS</set>
                <setType>KSSKODE</setType>
              </publicPositionCode>
            </positionInfo>
            <positionPercentage>100.0</positionPercentage>
            <positionStartDate>2021-05-01</positionStartDate>
            <positionStatistics includeInAA="true" includeInPAI="true">
              <businessNumber name="Fylkesadministrasjon Tønsberg" value="974574861"/>
              <companyNumber name="Vestfold og Telemark fylkeskom" value="821227062"/>
              <servicePlace id="1200">
                <name>Sentraladministrasj.</name>
              </servicePlace>
              <workClassification name="Rådgiver (økonomi og samfunnsvitenskap" value="2411107"/>
              <workMunicipality name="TØNSBERG KOMMUNE" value="3803"/>
            </positionStatistics>
            <salaryInfo>
              <basicSalary>100000000000000.00</basicSalary>
              <paymentLocation name="Teknologi/digitalise" value="1120"/>
              <salaryTable name="Kapittel 5" value="50"/>
              <wageFrame code="P">
                <description>Personlig lønn</description>
              </wageFrame>
              <wageFrameAutoRiseCode>S</wageFrameAutoRiseCode>
              <yearlySalary>1111111111111111111111111111111</yearlySalary>
            </salaryInfo>
            <shiftWork>false</shiftWork>
            <weeklyHours>37.50</weeklyHours>
            <workDaysInWeek friday="true" monday="true" saturday="false" sunday="false" thursday="true" tuesday="true" wednesday="true"/>
            <yearlyHours>1950.00</yearlyHours>
          </position>
        </positions>
        <startDate>2020-05-01</startDate>
        <statistics>
          <paiEducation name="Master of disaster" value="129 "/>
        </statistics>
        <taxDetails>
          <deductionLimit>false</deductionLimit>
          <fullTax>false</fullTax>
          <secondEmployee>false</secondEmployee>
          <taxDeductionCard cardId="0" cardName="Månedstabell" cardType="M"/>
          <taxExemptionCard>0.00</taxExemptionCard>
          <taxPercentage>0.00</taxPercentage>
        </taxDetails>
      </employment>
    </employments>
    <familyName>Betjent</familyName>
    <genderCode>MALE</genderCode>
    <givenName>Bjarne</givenName>
    <lastChangedDate>2021-09-06T13:57:39</lastChangedDate>
    <maritalStatus>Loff</maritalStatus>
    <nationalityCode>NO</nationalityCode>
    <postalAddress>
      <address1></address1>
      <countryCode></countryCode>
      <postalArea></postalArea>
      <postalCode></postalCode>
    </postalAddress>
    <ssn>12345678912</ssn>
  </person>
</personsXML>`
}

module.exports = {
  getXml,
  personIdHRM,
  email,
  mobilePhone,
  workPhone
}
