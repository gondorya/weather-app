const request = require('request');

function forecast(latitude, longitude, callback) {
	const url = `https://api.darksky.net/forecast/015dd092131805418c07b4541219968d/${latitude},${longitude}?units=si`;
	const currentWeather = (data) => {
		const text = `${data.daily.data[0].summary} It's currently ${data.currently
			.temperature} degrees out. There is a ${data.currently.precipProbability}% chance to rain`;
		return text;
	};

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect', undefined);
		} else if (body.error) {
			callback('Cannot find location', undefined);
		} else {
			callback(undefined, currentWeather(body));
		}
	});
}

module.exports = forecast;
