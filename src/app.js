const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;
console.log(port);

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


// Setup express routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ihab Bobbo el Gamed awy w ma7adesh 2ader 3aleeh y welad el a7ba y manayek'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ihab Bobbo el Gamed awy w ma7adesh 2ader 3aleeh y welad el a7ba y manayek'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page',
        name: 'Ihab Bobbo el Gamed awy w ma7adesh 2ader 3aleeh y welad el a7ba y manayek',
        message: 'Here is a help message'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Please provide an address'});
    }

    geocode(req.query.address, (error, { location, longitude, latitude } = {}) => {    
        if(error) {
            return res.send({error});
        } 
        forecast(latitude, longitude, (error, dataForcast) => {
            if(error) {
                return res.send({error});
            }

            res.send({
            location,
            forecast: dataForcast,
            });
        });
    
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        });
    }

    res.send({
        products: []
    });
});

// Specefic cannot find 'ay ebn mtnaka'
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Ihab Bobbo el Gamed awy w ma7adesh 2ader 3aleeh y welad el a7ba y manayek'
        
    });
});

// '*' means ay ebn mtnaka mesh la2eeh
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 page not found',
        name: 'Ihab Bobbo el Gamed awy w ma7adesh 2ader 3aleeh y welad el a7ba y manayek'
    })
});

app.listen(port, () => {
    console.log(`Server up and running on PORT ${port}`);
});