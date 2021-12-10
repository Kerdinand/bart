import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

const SearchSelection = () => {
	const [stations, setStations] = useState('12TH,12th St. Oakland City Center')
	const [isLoaded, setIsLoaded] = useState(false);
	const [originChoice, setOriginChoice] = useState(stations)
	const [destinationChoice, setDestinationChoice] = useState(stations)
	const [resultsReceived, setResultsReceived] = useState(false);
	const [routeData, setRouteData] = useState(false)

	useEffect(() => {
		const getStationData = async () => {
			const fetchOptions = {
				method: 'POST',
				body: JSON.stringify({
					title: 'Supply all stations',
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
			const response = await fetch('http://localhost:4000/api/v1/search/getStationData', fetchOptions)
			const object = await response.json();
			const stations= []
			object.root.stations.station.forEach((station) => stations.push(station))
			setStations(stations)
			setIsLoaded(true);
		}
		getStationData()
	}, [])

	const getRouteData = async () => {
		const fetchOptions = {
			method: 'POST',
			body: JSON.stringify({
				title: 'Get route info',
				origin: originChoice.substring(0,4),
				destination: destinationChoice.substring(0,4),
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
		const response = await fetch('http://localhost:4000/api/v1/search/getRouteData', fetchOptions)
		const object = await response.json();
		console.log(object)
		setRouteData(object)
		setResultsReceived(true)
	}

	if (!isLoaded) {
		return (<div>Loading...</div>)
	} else {
		return ( 
			<div>
				<div className="selection">
					<select name="origin" id="origin" onChange={e => setOriginChoice(e.target.value)}>
					{stations.map((station) => (
						<option key={station.abbr} value={[station.abbr, station.name]}>{station.name}</option>
					))}
					</select>
					<p id="switch">
						<ion-icon
							name="swap-horizontal-outline"
							class="icon"
						></ion-icon>
					</p>
					<select name="destination" id="destination" onChange={e => setDestinationChoice(e.target.value)}>
					{stations.map((station) => (
						<option key={station.abbr} value={[station.abbr, station.name]}>{station.name}</option>
					))}
					</select>
					<div>
						<div className="calendar" id="open-cal">
							<ion-icon name="calendar-outline"></ion-icon>
						</div>
						<button type="submit" id="search" onClick={getRouteData}>Search</button>
						<div className="later-dep">
							<ion-icon name="chevron-down-outline"></ion-icon>
						</div>
						<div className="earlier-dep">
							<ion-icon name="chevron-up-outline"></ion-icon>
						</div>
					</div>
				</div>
				<div className="results">
					<SearchResults routeData={routeData} loaded={resultsReceived}></SearchResults>
				</div>
			</div>
			
		 );
	}
	
    
}
 
export default SearchSelection;