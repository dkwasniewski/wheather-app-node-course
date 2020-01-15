const express = require('express')
// const chalk = require('chalk')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const geocodeUtils = require('./utils/geocode')
const wheatherUtils = require('./utils/wheater')
const config = require('./config')

const { GEOCODE: { baseURL, accessToken } } = config
const { getForecastByAddress, getGeocodeFullUrl } = geocodeUtils

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const SERVER = {
  port,
  baseUrl: 'http://localhost'
}

app.get('', (req, res) => {
  res.render('index', {
    title: 'Wheather',
    footerMessage: 'Created by Daniel Kwaśniewski'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Zelda',
    src: `/images/images.jpg`,
    footerMessage: 'Created by Daniel Kwaśniewski'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Static app',
    message: 'Help message',
    footerMessage: 'Created by Daniel Kwaśniewski'
  })
})

app.get('/wheather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address'
    })
  }

  const forecastData = getForecastByAddress({
    url: getGeocodeFullUrl(baseURL, req.query.address, `access_token=${accessToken}`),
    callback: wheatherUtils.getWheaterMessage,
    next: (forecastData) => {
      res.send({
        forecast: forecastData,
        location: req.query.address
      })
    }
  })

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Static app',
    message: 'Help article not found',
    footerMessage: 'Created by Daniel Kwaśniewski'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Static app',
    message: 'Page not found',
    footerMessage: 'Created by Daniel Kwaśniewski'
  })
})

app.listen(port, () => {
  // const addressMsg = chalk.cyan(`${port}`)
  console.log(`Server is running on port ${addressMsg}`)
})