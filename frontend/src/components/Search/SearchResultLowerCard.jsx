import SearchLegInfo from "./SearchLegInfo";
import SearchTransitInfo from "./SearchTransitInfo";

const SearchResultLowerCard = (props) => {
    console.log(props.stationData)
    const elements = []
    for (let i = 0; i < props.tripData.leg.length; i++) {
        if (i === 0) {
            elements.push(<SearchLegInfo tripData={props.tripData.leg[i]} stationData={props.stationData}></SearchLegInfo>)
        } else {
            elements.push(<SearchTransitInfo arrivalTime={props.tripData.leg[i - 1]['@destTimeMin']} departureTime={props.tripData.leg[i]['@origTimeMin']}></SearchTransitInfo>)
            elements.push(<SearchLegInfo tripData={props.tripData.leg[i]} stationData={props.stationData}></SearchLegInfo>)
        }
    }



    return ( 
        <div className="lower-card lower-card-hidden">
            {elements}
        </div>
     );
}
 
export default SearchResultLowerCard;