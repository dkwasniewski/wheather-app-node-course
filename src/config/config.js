const GEOCODE = {
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  accessToken: 'pk.eyJ1IjoiZGFrd2Fzbmlld3NraSIsImEiOiJjanpsam5hYzIwNHk4M25yNzhzajN0ejdoIn0.ZRtZXLFEgBeedkXGTJbbrQ'
}
const FORECAST = {
  baseURL: 'https://api.darksky.net/forecast/',
  query: 'units=auto',
  token: 'ad40204ac7cd56fbf670ffcf223d68a5'
}

module.exports = {
  FORECAST,
  GEOCODE
}