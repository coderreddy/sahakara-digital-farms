const path = require('path')
const express = require('express');
const hbs = require('hbs')

const publicFiles = (__dirname, path.resolve('./public'))
const viewFiles = (__dirname, path.resolve('./templates/views'))
const partialFiles = (__dirname, path.resolve('./templates/partials'))
const geo = (__dirname, path.resolve('./utils/geoCode.js'))
const weather = (__dirname, path.resolve('./utils/weather-service.js'))

//Fetch files from cross projects
//const geo = (__dirname, path.resolve('../weather-app/utils/geoCode.js'))
//const weather = (__dirname, path.resolve('../weather-app/utils/weather-service.js'))

const port = process.env.PORT || 7000
const geoCode = require(geo)
const weatherApi = require(weather)
const app = express();

//Set handlebars and view configs
app.set('view engine', 'hbs')
app.set('views', viewFiles)
app.set('partials', partialFiles)
hbs.registerPartials(partialFiles)

//set static file content
app.use(express.static(publicFiles))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        summary: 'Use this App to get Weather Information',
        createdBy: 'Krishna',
        Version: '1.0'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        role: 'About this app',
        summary: 'Provides the weather information',
        createdBy: 'Krishna',
        Version: '1.0'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        menu: 'API Info',
        type: 'Navigate to Home page or /weather resource for weather data',
        createdBy: 'Krishna',
        Version: '1.0'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city || !req.query.state) {
        return res.send({
            error: 'Please provide City and State'
        })
    }
    geoCode(req.query.city, req.query.state, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        weatherApi(latitude, longitude, (error, { current, location } = {}) => {
            const { temperature, feelslike, humidity } = current
            const { name, country, region } = location
            const forecast = current.weather_descriptions[0] + '. Its currently ' + temperature + ' degress out. It Feels like ' + feelslike + ' degress out. The Humidity is ' + humidity + '%';
            const loc = 'City: ' + name + ', Country: ' + country + ', Region: ' + region
            res.send({
                forecast,
                loc
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        createdBy: 'Krishna',
        Version: '1.0'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        errorMessage: 'Page Not Found',
        createdBy: 'Krishna',
        Version: '1.0'

    })
})


app.listen(port, () => {
    console.log('Express Server Started')
});