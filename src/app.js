const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'weather app',
		name: 'me'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'about weather app',
		name: 'me'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'me',
		helpText: 'Helpful text'
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;
	let loc = '';

	if (!address) {
		return res.send({
			error: 'Please, provide some address'
		});
	}

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			return res.send({
				forecast: forecastData,
				location,
				address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Provide a search term'
		});
	}

	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMessage: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: 'Page not found'
	});
});

app.listen(port, () => {
	console.log('Server is up on http://localhost:3000/');
});
