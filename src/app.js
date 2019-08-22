const express = require('express')
const path = require('path')
const hbs = require('hbs') // Needed for hbs
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Define path for Express Config
const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialSPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialSPath)

// Setup static Directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vu Diep Hung'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vu Diep Hung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful text',
        name: 'Vu Diep Hung'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) return res.send('You must provide location for Forecast information!')

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error })

            res.send({
                latitude,
                longitude,
                location,
                forecast: forecastData
            })

        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Help Article Not Found!',
        name: 'Vu Diep Hung'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Page Not Found!',
        name: 'Vu Diep Hung'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})