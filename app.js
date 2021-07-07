// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 5000

// Static Files
app.use(express.static('/public/'))
app.use('/style.css', express.static(__dirname + '/public/style.css'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/fonts', express.static(__dirname + '/public/fonts'))
app.use('/images', express.static(__dirname + '/public/images'))
app.use('/js', express.static(__dirname + '/public/js'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts')
app.set('view engine', 'ejs')

// Routes
app.get('', (req, res) => {
    res.render('index', { title: 'Home Page' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' })
})

// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))