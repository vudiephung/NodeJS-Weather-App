// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/9cb374d64bb37d3d6ebdb01b00fbd491/' + latitude + ',' + longitude

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

const weatherForm = document.querySelector('.search-form')
const searchEle = document.querySelector('.search-input')
const message1 = document.querySelector('.message1')
const message2 = document.querySelector('.message2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchEle.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) message1.textContent = data.error
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })

})


