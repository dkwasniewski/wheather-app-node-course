const request = require('request')
const chalk = require('chalk')

function getGeocodeFullUrl(url, address, query) {
  if (!address) {
    console.log(chalk.yellow.inverse('Please provide an address'))
  }
  return `${url}${encodeURIComponent(address)}.json?${query}`
}

function getForecastByAddress({
  url,
  callback,
  next
}) {
  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log(chalk.red.inverse(`Mapbox API Error: ${error}`))
      return
    }

    if (!response.body.features.length) {
      console.log(chalk.yellow.inverse('No coordinates found'))
      return
    }

    const { place_name, center } = response.body.features[0]
    const lat = center[1]
    const long = center[0]
    const data = callback({
      place: place_name,
      lat,
      long,
      next
    })

    return data
  })
}

module.exports = {
  getForecastByAddress,
  getGeocodeFullUrl
}