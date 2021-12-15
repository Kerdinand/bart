import SearchResultUpperCard from "./SearchResultUpperCard";
import SearchResultLowerCard from "./SearchResultLowerCard";

const SearchResults = (props) => {
    //console.log(props.routeData.root.schedule.request.trip)
    
    if (!props.loaded) {
        return (
            <div>
                Waiting for request
            </div>
        )
    } else {
        const tripData = props.routeData.root.schedule.request.trip;
        const elements = [];

        for (let i = 0; i < tripData.length; i++) {
            elements.push(
            <div className="card" key={`card${i}`}>
                <SearchResultUpperCard tripData={ tripData[i] } key={`upper${i}`} ></SearchResultUpperCard>
                <SearchResultLowerCard tripData={ tripData[i] } key={`lower${i}`} stationData={props.stationData}></SearchResultLowerCard>
            </div>);
        }
        return (
            <div>
                {elements}
            </div>
            
            );
    }    
}
 
export default SearchResults;