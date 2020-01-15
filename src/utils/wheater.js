const request = require('request')
const chalk = require('chalk')

const config = require('../config')

const { FORECAST: { baseURL, query, token } } = config

function getFullForecastUrl(url, token, { lat, long }, query) {
  return `${url}${token}/${lat},${long}?${query}`
}

function getWheaterMessage({
  place,
  lat,
  long,
  next
}) {
  const url = getFullForecastUrl(baseURL, token, { lat, long }, query)
  let result
  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log(chalk.red.inverse(`Forecast API Error: ${error}`))
      return
    }

    if (!response.body) {
      console.log(chalk.yellow.inverse('No forecast found'))
      return
    }

    const {
      temperature,
      precipProbability
    } = response.body.currently
    const friendlyMessage = `In ${place}, there is currently ${temperature} degrees out and ${precipProbability}% chance of rain`
    next(friendlyMessage)
  })
  return result
}

module.exports ={
  getWheaterMessage
}