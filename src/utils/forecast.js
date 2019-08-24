const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9cb374d64bb37d3d6ebdb01b00fbd491/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out with a low of ' + body.daily.data[0].temperatureLow + ' degrees and high of ' + body.daily.data[0].temperatureHigh + ' degrees. There is a ' + body.currently.precipProbability * 100 + '% chance of rain. UV index: ' + body.currently.uvIndex)
        }
    })
}

module.exports = forecast