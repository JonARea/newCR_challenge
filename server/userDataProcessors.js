const jsonxml = require('jsontoxml')

     /*HELPER FUNCTIONS */
const convertToPercentage = (filteredArray, array) => Math.round(filteredArray.length / array.length * 100)

const findPercentageByLocation = (users, regionType) => {
  const userRegions = users.map(user => user.location[regionType])
  //create a map of totals for each region
  const regionCounts = {}
  userRegions.forEach(region => {
    if (!regionCounts[region]) {
      regionCounts[region] = 0
    }
    regionCounts[region]++
  })
  //convert to an array by percentages
  const percentageByRegion = []
  for (let region in regionCounts) {
    percentageByRegion.push({[regionType]: region, percentage: Math.round(regionCounts[region] / users.length * 10000) / 100})
    percentageByRegion.sort((a, b) => b.percentage - a.percentage)
  }
  return percentageByRegion.slice(0, 11)
}

const findPercentageByAge = (users) => {
  const ageRanges = {
    'Range:0-20': {
      count: 0,
      percentage: 0
    },
    'Range:21-40': {
      count: 0,
      percentage: 0
    },
    'Range:41-60': {
      count: 0,
      percentage: 0
    },
    'Range:61-80': {
      count: 0,
      percentage: 0
    },
    'Range:81-100': {
      count: 0,
      percentage: 0
    },
    'Range:100+': {
      count: 0,
      percentage: 0
    }
  }
  const ages = users.map(user => user.dob.age)
  // divide into age ranges
  ages.forEach(age => {
    switch (true) {
      case age < 21:
        ageRanges['Range:0-20'].count++
        break;
      case age < 41:
        ageRanges['Range:21-40'].count++
        break
      case age < 61:
        ageRanges['Range:41-60'].count++
        break
      case age < 81:
        ageRanges['Range:61-80'].count++
        break
      case age < 100:
        ageRanges['Range:81-100'].count++
        break
      case age >= 100:
        ageRanges['Range:100+'].count++
        break
      default:
        break
    }
  })
  // calculate percentages
  for (let range in ageRanges) {
    ageRanges[range].percentage = Math.round(ageRanges[range].count / ages.length * 100)
  }
  return Object.keys(ageRanges).map(range => ({range, percentage: ageRanges[range].percentage}))
}

     /*MAIN FUNCTIONS*/

const convertToJSON = (userData) => {
  const users = userData.results
  const females = users.filter(user => user.gender === 'female')
  const males = users.filter(user => user.gender === 'male')

  return {
    percentageByGender: {
      females: convertToPercentage(females, users),
      males: convertToPercentage(males, users)
    },
    percentageByFirstName: {
      AtoM: convertToPercentage(users.filter(user =>
        user.name.first < 'n'), users),
      NtoZ: convertToPercentage(users.filter(user =>
        user.name.first >= 'n'), users)
    },
    percentageByLastName: {
      AtoM: convertToPercentage(users.filter(user =>
        user.name.last < 'n'), users),
      NtoZ: convertToPercentage(users.filter(user =>
        user.name.last >= 'n'), users)
    },
    percentageByState: {
      overall: findPercentageByLocation(users, 'state'),
      females: findPercentageByLocation(females, 'state'),
      males: findPercentageByLocation(males, 'state')
    },
    percentageByAge: {
      overall: findPercentageByAge(users),
      females: findPercentageByAge(females),
      males: findPercentageByAge(males)
    }
  }
}

const convertToXML = (userData) => {
  const jsonData = convertToJSON(userData)
  return jsonxml(jsonData)
}

const convertToText = (userData) => {
  const jsonData = convertToJSON(userData)
  return `User Statistics:

Percentage female versus male: ${jsonData.percentageByGender.females}% vs ${jsonData.percentageByGender.males}%

Percentage of first names that start with A‐M versus N‐Z: ${jsonData.percentageByFirstName.AtoM}% vs ${jsonData.percentageByFirstName.NtoZ}%

Percentage of last names that start with A‐M versus N‐Z: ${jsonData.percentageByLastName.AtoM}% vs ${jsonData.percentageByLastName.NtoZ}%

Percentage of people in each state, up to the top 10 most populous states:\n${jsonData.percentageByState.overall.map(state => '  ' + Object.values(state).join(': ') + '%').join('\n')}

Percentage of females in each state, up to the top 10 most populous states:\n${jsonData.percentageByState.females.map(state => '  ' + Object.values(state).join(': ') + '%').join('\n')}

Percentage of males in each state, up to the top 10 most populous states:\n${jsonData.percentageByState.males.map(state => '  ' + Object.values(state).join(': ') + '%').join('\n')}

Percentages by age:
  Overall:
    ${jsonData.percentageByAge.overall.map(elem => `${elem.range} - ${elem.percentage}%`).join('\n    ')}
  Males:
    ${jsonData.percentageByAge.males.map(elem => `${elem.range} - ${elem.percentage}%`).join('\n    ')}
  Females:
    ${jsonData.percentageByAge.females.map(elem => `${elem.range} - ${elem.percentage}%`).join('\n    ')}
  `
}

module.exports = {
  convertToJSON,
  convertToXML,
  convertToText
}
