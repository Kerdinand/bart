// Get html fields
const originChoice = document.getElementById('origin');
const destinationChoice = document.getElementById('destination');
const button = document.getElementById('search');
const saveFavorites = document.getElementById('test');

const loading = document.getElementById('loading');
const body = document.body;

const switchButton = document.getElementById('switch');

// Get the basic Stationdata
const getAllStationData = async () => {
	const res = await fetch(
		`https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y`
	);
	const obj = await res.json();
	return obj;
};

// Create the options for the select fields
getAllStationData().then((object) => {
	for (let i = 0; i < object.root.stations.station.length; i++) {
		let station = object.root.stations.station[i].name;
		let element = document.createElement('option');
		element.textContent = station;
		element.value = station;
		originChoice.append(element);
	}
	for (let i = 0; i < object.root.stations.station.length; i++) {
		let station = object.root.stations.station[i].name;
		let element = document.createElement('option');
		element.textContent = station;
		element.value = station;
		destinationChoice.append(element);
	}
});

const getStationCodes = (object) => {
	let originCode = '';
	let destinationCode = '';
	for (let i = 0; i < object.root.stations.station.length; i++) {
		if (originChoice.value == object.root.stations.station[i].name) {
			originCode = object.root.stations.station[i].abbr;
		}
		if (destinationChoice.value == object.root.stations.station[i].name) {
			destinationCode = object.root.stations.station[i].abbr;
		}
	}
	let result = [originCode, destinationCode];
	return result;
};

const getRouteData = async (originCode, destinationCode) => {
	res = await fetch(
		`https://api.bart.gov/api/sched.aspx?cmd=depart&orig=${originCode}&dest=${destinationCode}&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=4&l=1&json=y`
	);

	const obj = await res.json();
	return obj;
};

const getLineColor = async () => {
	const res = await fetch(
		'https://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V&json=y'
	);
	const obj = res.json();
	return obj;
};

const createDivWithClass = (element, name, idInput = null, html = 'div') => {
	let div = document.createElement(html);
	div.className = name;
	if (idInput !== null) {
		div.id = idInput;
	}
	element.appendChild(div);
};

const createDivWithIcon = (element, icon, idInput = null) => {
	let div = document.createElement('div');
	div.innerHTML = icon;
	if (idInput !== null) {
		div.id = idInput;
	}
	element.appendChild(div);
	//console.log(div);
};

const getRouteStations = async (routeId) => {
	const res = await fetch(
		`https://api.bart.gov/api/sched.aspx?cmd=routesched&route=${routeId}&key=MW9S-E7SL-26DU-VV8V&json=y`
	);
	const obj = await res.json();
	return obj;
};

const getDeps = async (object) => {
	let result = [];
	object.forEach(async (fav) => {
		const res = await fetch(
			`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${fav}&key=MW9S-E7SL-26DU-VV8V&json=y`
		);
		const obj = await res.json;
		result.push(obj);
		return result;
	});
};

const getConnectingTime = (arrival, departure) => {
	let dif =
		(new Date('1970-1-1 ' + departure) - new Date('1970-1-1 ' + arrival)) /
		1000 /
		60 /
		60;
	console.log(dif);
};
const contentDispatcher = (data) => {
	console.log(data);
	const nummberOfCards = document.getElementsByClassName('card');
	const lengthOfResults = nummberOfCards;
	const results = document.getElementById('results');
	//console.log(nummberOfCards.length);
	if (lengthOfResults.length !== 0) {
		results.innerHTML = '';
	}

	for (let i = 0; i < data[0].root.schedule.request.trip.length; i++) {
		createDivWithClass(
			results,
			'card animate__animated animate__fadeInLeft',
			`card${i + 1}`
		);
		let currentCard = results.getElementsByClassName('card')[i];

		createDivWithClass(currentCard, 'upper-card', `upper-card${i + 1}`);
		createDivWithClass(currentCard, 'lower-card', `lower-card${i + 1}`);

		let currentUpper = document.getElementById(`upper-card${i + 1}`);
		let currentLower = document.getElementById(`lower-card${i + 1}`);

		createDivWithClass(currentUpper, 'times');

		let times = currentUpper.getElementsByClassName('times')[0];

		createDivWithClass(times, 'beginn-time', null, 'span');
		createDivWithClass(times, 'end-time', null, 'span');

		createDivWithClass(currentUpper, 'route');
		createDivWithClass(currentUpper, 'duration');
		createDivWithClass(currentUpper, 'price');
		createDivWithClass(currentUpper, 'details-view');

		currentUpper.getElementsByClassName('details-view')[0].innerHTML =
			'<ion-icon name="search-outline"></ion-icon>';
		// Set dep time for upper card
		times.getElementsByClassName('beginn-time')[0].innerHTML =
			data[0].root.schedule.request.trip[i]['@origTimeMin'] + ' - ';

		// Set arr time for upper card
		times.getElementsByClassName('end-time')[0].innerHTML =
			data[0].root.schedule.request.trip[i]['@destTimeMin'];

		// Set all the used lines in the upper card -> Function

		const setLinesUsed = (data) => {
			route = currentUpper.getElementsByClassName('route')[0];
			let linesUsed = data[0].root.schedule.request.trip[i].leg;
			const allLines = data[1].root.routes.route;
			for (let n = 0; n < linesUsed.length; n++) {
				let span = document.createElement('span');
				span.innerHTML = linesUsed[n]['@line'].substring(6);
				allLines.forEach((line) => {
					if (line.routeID == linesUsed[n]['@line']) {
						span.style.backgroundColor = line.hexcolor;
					}
				});
				route.appendChild(span);
				if (linesUsed.length > 1 && n + 1 < linesUsed.length) {
					let span = document.createElement('span');
					span.innerHTML =
						'<ion-icon name="chevron-forward-outline"></ion-icon>';
					route.appendChild(span);
				}
			}
		};
		// Call function to set the lines
		setLinesUsed(data);

		// Set total duration in the upper card
		currentUpper.getElementsByClassName('duration')[0].innerHTML =
			data[0].root.schedule.request.trip[i]['@tripTime'] + ' Min.';

		// Set the price inside of the upper card
		currentUpper.getElementsByClassName('price')[0].innerHTML =
			data[0].root.schedule.request.trip[i]['@clipper'] + '$';

		// Set line color for upper card

		// Add event listener for details view
		let details = currentUpper.getElementsByClassName('details-view')[0];
		details.addEventListener('click', (event) => {
			if (currentLower.style.display == 'grid') {
				currentLower.style.display = 'none';
			} else {
				currentLower.style.display = 'grid';
			}
		});

		/***********************************************************
			FROM HERE ON, THE LOWER CARDS ARE FILLED WITH CONTENT
		***********************************************************/

		for (
			let n = 0;
			n < data[0].root.schedule.request.trip[i].leg.length;
			n++
		) {
			// Get Route and Station Data
			/*getRouteStations(
				data[0].root.schedule.request.trip[i].leg[n]['@line'].slice(-2)
			).then((routeData) => {
				console.log(routeData);
			});*/
			// Get lower part of the card
			let lowerCard = document.getElementById(`lower-card${i + 1}`);
			// Element Creation

			if (n == 0) {
				createDivWithClass(lowerCard, 'dep-time');
				createDivWithClass(lowerCard, 'origin');
				createDivWithClass(lowerCard, 'route');
				createDivWithClass(lowerCard, 'head-dest');
				createDivWithClass(lowerCard, 'arr-time');
				createDivWithClass(lowerCard, 'destination');
			} else {
				createDivWithClass(lowerCard, 'switch');
				let switchDiv =
					lowerCard.getElementsByClassName('switch')[n - 1];
				createDivWithIcon(
					switchDiv,
					'<ion-icon name="shuffle"></ion-icon>'
				);
				createDivWithClass(lowerCard, 'switch-time');
				createDivWithClass(lowerCard, 'dep-time');
				createDivWithClass(lowerCard, 'origin');
				createDivWithClass(lowerCard, 'route');
				createDivWithClass(lowerCard, 'head-dest');
				createDivWithClass(lowerCard, 'arr-time');
				createDivWithClass(lowerCard, 'destination');
			}

			// Get the connecting time

			if (n > 0) {
				let switchTimeDiv =
					lowerCard.getElementsByClassName('switch-time')[n - 1];
				let arrivalTime = data[0].root.schedule.request.trip[i].leg[
					n - 1
				]['@destTimeMin'].substring(3, 5);
				let departureTime = data[0].root.schedule.request.trip[i].leg[
					n
				]['@origTimeMin'].substring(3, 5);

				if (arrivalTime > departureTime) {
					departureTime = departureTime * 1 + 60;
				}

				let transitTime = departureTime - arrivalTime;
				switchTimeDiv.innerHTML = `<p>${transitTime} min. of Transfer Time.<p>`;

				if (transitTime < 4) {
					switchTimeDiv.getElementsByTagName('p')[0].style.color =
						'red';
				} else if (transitTime < 7 && transitTime >= 4) {
					switchTimeDiv.getElementsByTagName('p')[0].style.color =
						'orange';
				}
			}

			// Set departure times
			lowerCard.getElementsByClassName('dep-time')[n].innerHTML =
				data[0].root.schedule.request.trip[i].leg[n]['@origTimeMin'];

			// Set arrival times
			lowerCard.getElementsByClassName('arr-time')[n].innerHTML =
				data[0].root.schedule.request.trip[i].leg[n]['@destTimeMin'];

			// Set Departure Stations
			let origin = getStationName(
				data[0].root.schedule.request.trip[i].leg[n]['@origin'],
				data[2]
			);
			lowerCard.getElementsByClassName('origin')[n].innerHTML = origin;

			// Set Arrival Stations
			let destination = getStationName(
				data[0].root.schedule.request.trip[i].leg[n]['@destination'],
				data[2]
			);
			lowerCard.getElementsByClassName('destination')[n].innerHTML =
				destination;

			// Set Head of train
			lowerCard.getElementsByClassName('head-dest')[n].innerHTML =
				data[0].root.schedule.request.trip[i].leg[n][
					'@trainHeadStation'
				];

			// Set Routes
			lowerCard.getElementsByClassName('route')[n].innerHTML =
				'<p>' +
				data[0].root.schedule.request.trip[i].leg[n]['@line'] +
				'</p>';

			// Set color of the line
			data[1].root.routes.route.forEach((route) => {
				if (
					route.routeID ==
					data[0].root.schedule.request.trip[i].leg[n]['@line']
				) {
					lowerCard
						.getElementsByClassName('route')
						[n].getElementsByTagName('p')[0].style.backgroundColor =
						route.hexcolor;
				}
			});

			// Calculate connection time
		}
	}
};

const getStationName = (stationCode, data) => {
	for (let i = 0; i < data.root.stations.station.length; i++) {
		if (stationCode == data.root.stations.station[i].abbr) {
			return data.root.stations.station[i].name;
		}
	}
};

const getStops = (data) => {
	console.log(data);
};

button.addEventListener('click', (event) => {
	if (
		originChoice.value == 'Choose a Origin' ||
		destinationChoice.value == 'Choose a Destination'
	) {
		alert('Please select a Origin and Destination');
	} else {
		if (originChoice.value == destinationChoice.value) {
			alert('Please select two different stations');
		} else {
			loading.style.display = 'block';
			getAllStationData().then((object) => {
				const stationCode = getStationCodes(object);
				Promise.all([
					getRouteData(stationCode[0], stationCode[1]),
					getLineColor(),
					getAllStationData(),
				]).then((data) => {
					//console.log(data);
					contentDispatcher(data);

					results.style.display = 'block';
					loading.style.display = 'none';
				});
			});
		}
	}
});

switchButton.addEventListener('click', (event) => {
	let currentOriginChoice = originChoice.value;
	let currentDestinationChoice = destinationChoice.value;

	originChoice.value = currentDestinationChoice;
	destinationChoice.value = currentOriginChoice;
});

const login = document.getElementsByClassName('login')[0];
const settingsView = document.getElementsByClassName('settings-view')[0];
const openSettings = document.getElementsByClassName('settings')[0];
const closeProfile = login.getElementsByClassName('close')[0];
const closeSettings = settingsView.getElementsByClassName('close')[0];
const profile = document.getElementsByClassName('profile')[0];
const openFavorites = document.getElementsByClassName('favorites')[0];
const favoritesView = document.getElementsByClassName('favorites-view')[0];
const closeFavorites = favoritesView.getElementsByClassName('close')[0];
const viewDate = document.getElementsByClassName('date-view')[0];
const openDate = document.getElementById('open-cal');
const closeDate = viewDate.getElementsByClassName('close')[0];

openDate.addEventListener('click', (event) => {
	viewDate.style.display = 'grid';
});

closeDate.addEventListener('click', (event) => {
	viewDate.style.display = 'none';
	customDate = true;
});

closeProfile.addEventListener('click', (event) => {
	login.style.display = 'none';
	body.style.overflowY = 'auto';
});

profile.addEventListener('click', (event) => {
	login.style.display = 'flex';
	body.style.overflowY = 'hidden';
});

openSettings.addEventListener('click', (event) => {
	settingsView.style.display = 'flex';
	body.style.overflowY = 'hidden';
});

closeSettings.addEventListener('click', (event) => {
	settingsView.style.display = 'none';
	body.style.overflowY = 'auto';
});

openFavorites.addEventListener('click', (event) => {
	favoritesView.style.display = 'flex';
	body.style.overflowY = 'hidden';
});

closeFavorites.addEventListener('click', (event) => {
	favoritesView.style.display = 'none';
	body.style.overflowY = 'auto';
});

let favoriteChoice = favoritesView.getElementsByClassName('favorite');

getAllStationData().then((object) => {
	for (let i = 0; i < object.root.stations.station.length; i++) {
		for (let n = 0; n < favoriteChoice.length; n++) {
			let station = object.root.stations.station[i].name;
			let element = document.createElement('option');
			element.textContent = station;
			element.value = station;
			favoriteChoice[n].append(element);
		}
	}
});

saveFavorites.addEventListener('click', (event) => {
	getAllStationData().then((object) => {
		let result = ['12TH', '16TH', '19TH'];
		for (let i = 0; i < object.root.stations.station.length; i++) {
			if (
				favoriteChoice[0].value ==
					object.root.stations.station[i].name &&
				favoriteChoice[0].value !== 'Choose a Origin'
			) {
				result[0] = object.root.stations.station[i].abbr;
			}
			if (
				favoriteChoice[1].value ==
					object.root.stations.station[i].name &&
				favoriteChoice[0].value !== 'Choose a Origin'
			) {
				result[1] = object.root.stations.station[i].abbr;
			}
			if (
				favoriteChoice[2].value ==
					object.root.stations.station[i].name &&
				favoriteChoice[0].value !== 'Choose a Origin'
			) {
				result[2] = object.root.stations.station[i].abbr;
			}
		}

		createCookie('favorites', result, 365);
		console.log(document.cookie);
		return result;
	});
});

const createCookie = (cname, cvalue, exdays) => {
	let date = new Date();
	date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = 'expires' + date.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

const removeAllCookies = () => {
	document.cookie =
		'favorites=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	document.cookie =
		'cookiesAccepted=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

const getCookie = (cname) => {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};

console.log(getCookie('favorites'));

const cookiesFooter = document.getElementsByClassName('cookies')[0];
const acceptCookies = cookiesFooter.getElementsByClassName('accept')[0];
const declineCookies = cookiesFooter.getElementsByClassName('decline')[0];
const nextDep = document.getElementsByClassName('next-dep');

acceptCookies.addEventListener('click', (event) => {
	cookiesFooter.style.display = 'none';
	createCookie('cookiesAccepted', 'yes', 365);
	console.log(document.cookie);
});

console.log(getCookie('cookiesAccepted'));
if (getCookie('cookiesAccepted') === 'yes') {
	cookiesFooter.style.display = 'none';
}

declineCookies.addEventListener('click', (event) => {
	removeAllCookies();
	cookiesFooter.style.display = 'none';
	console.log(document.cookie);
});

const declineCookiesSettings = settingsView.getElementsByClassName('delete')[0];

declineCookiesSettings.addEventListener('click', (event) => {
	removeAllCookies();
});
