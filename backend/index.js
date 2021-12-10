const { request, response } = require('express');
const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');
const fetch = require('node-fetch');

app.listen(4000, () => console.log('listening at 3000'));
app.use(express.static('../frontend/build'));
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/v1/search/getStationData', async (request, response) => {
	const fetch_object = await fetch(
		'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y'
	);
	const json = await fetch_object.json();
	response.json(json);
});

app.post('/api/v1/search/getRouteData', async (request, response) => {
	const fetch_object = await fetch(
		`https://api.bart.gov/api/sched.aspx?cmd=depart&orig=${request.body.origin}&dest=${request.body.destination}&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1&json=y`
	);
	const json = await fetch_object.json();
	response.json(json);
});
