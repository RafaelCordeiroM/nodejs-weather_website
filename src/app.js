const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app = express()
    /**
     * Define paths for express config
     */
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
    /**
     * setup hbs and views location
     */

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
    /**
     * setup static directory to serve
     */
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    //.render() -> render view
    res.render('index', {
        title: "Dinamic",
        author: "Rafael C. Martins"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "This is about",
        author: "Rafael C. Martins"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: {
            name: "Wanna help?"
        },
        author: "Rafael C. Martins"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({
        error: "you must provide an address"
    })

    geocode(req.query.address, (error, data) => {
        if (error) return res.send({ error })
        forecast(data, (error, { current }) => {
            if (error) return res.send({ error })

            res.send({
                address: data.location,
                temperature: current.temperature,
            })
        })
    })

})

//match help but not the other
app.get('/help/*', (req, res) => {
        res.render('404', { title: "Unit not found", author: "Rafael C. Martins" })
    })
    //the rest
app.get('*', (req, res) => {
    res.render('404', { title: "page not found", author: "Rafael C. Martins" })
})

app.listen(3000, () => {
    console.log('server is running')
})