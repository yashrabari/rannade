// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authenticate = require('./middleware/authenticate');
const expressLayouts = require('express-ejs-layouts')

const { adminRoutes, categoryRoutes, userRoutes, productRoutes, cartItemRoutes, orderRoutes } = require('./routes')


const app = express()
const port = 5000

// Static Files
app.use(express.static('/public/'))
app.use('/style.css', express.static(__dirname + '/public/style.css'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/fonts', express.static(__dirname + '/public/fonts'))
app.use('/images', express.static(__dirname + '/public/images'))
app.use('/js', express.static(__dirname + '/public/js'))

mongoose.connect('mongodb://127.0.0.1:27017/rannade', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

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


app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', authenticate, cartItemRoutes);
app.use('/order', authenticate, orderRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    })
})



// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))