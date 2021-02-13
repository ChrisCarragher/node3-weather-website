const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')



const app = express()

// Define Paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine + location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Chris',
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Chris',
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Chris',
        message: 'How can I help?',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({error: 'You must provide an address '}) 
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error){
            return res.send({error}) 
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error){
                return res.send({error}) 
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
            })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
        
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Chris',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Chris',
        errorMessage: 'Page not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})