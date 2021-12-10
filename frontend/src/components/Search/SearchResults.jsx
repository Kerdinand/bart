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
        return (
            <div>
                <SearchResultUpperCard></SearchResultUpperCard> 
                <SearchResultLowerCard></SearchResultLowerCard>
            </div>
            
            );
    }    
}
 
export default SearchResults;