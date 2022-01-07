const SearchResultUpperCard = (props) => {
    console.log(props.tripData['@origTimeMin'])

    const toggleView = () => {
        console.log(props)
    }
    // Create Routes Overview
    let usedRoutes = ''
    for (let i = 0; i < props.tripData.leg.length; i++) {
        if (i === 0) {
            usedRoutes = props.tripData.leg[i]['@line']
        } else {
            usedRoutes = usedRoutes + '->' + props.tripData.leg[i]['@line']
        }
        
    }

    return ( 
        <div className="upper-card">
            <div className="times">
                <span className="beginn-time">{props.tripData['@origTimeMin']}</span><br></br>
                <span className="end-time">{props.tripData['@destTimeMin']}</span>
            </div>
            <div className="route">{usedRoutes}</div>
            <div className="duration">{props.tripData['@tripTime']} Min.</div>
            <div className="price">{props.tripData['@clipper']}$</div>
            <div className="details-view" onClick={toggleView}><ion-icon name="search-outline"></ion-icon></div>
        </div>
     );
}
 
export default SearchResultUpperCard;