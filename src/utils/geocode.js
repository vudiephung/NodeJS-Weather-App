const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaHVuZ3Z1MjM4IiwiYSI6ImNqemxkdmhibDB1bHczbnBwMDJ0a3k4aXoifQ.r1nZjH7NzlFnkR__JbEUYA'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } 
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
         else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode