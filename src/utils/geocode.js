const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiZ29uZG9yeWFhIiwiYSI6ImNqdWU1dTVyeTAwM3M0YXAzc2FrNW9uZmMifQ.4AL8VwsdoC86k5p8LWsEIg`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect', undefined);
		} else if (body.features.length === 0) {
			callback('Cannot find location', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
