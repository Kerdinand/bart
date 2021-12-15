const SearchLegInfo = (props) => {

    console.log(props.stationData)

    const getStationName = (stationCode, stationData) => {
        for (let i = 0; i < stationData.length; i++) {
            if (stationCode === stationData[i].abbr) {
                return stationData[i].name
            }
        }
    }

    const origin = getStationName(props.tripData['@origin'], props.stationData)
    const destination = getStationName(props.tripData['@destination'], props.stationData)

    return ( 
        <div className="leg-grid">
            <div className="dep-time">{props.tripData['@origTimeMin']}</div>
            <div className="origin">{origin}</div>
            <div className="route">{props.tripData['@line']}</div>
            <div className="head-dest">{props.tripData['@trainHeadStation']}</div>
            <div className="arr-time">{props.tripData['@destTimeMin']}</div>
            <div className="destination">{destination}</div>
        </div>
     );
}
 
export default SearchLegInfo;