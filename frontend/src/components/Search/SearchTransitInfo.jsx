const SearchTransitInfo = (props) => {
    let arrivalTime = props.arrivalTime.substring(3, 5);
    let departureTime = props.departureTime.substring(3, 5);

    if (arrivalTime > departureTime) {
        departureTime = departureTime * 1 + 60;
    }

    let transitTime = departureTime - arrivalTime;
    let tightConnectionColor = 'black'
    if (transitTime < 4) {
        tightConnectionColor = 'red'
    }

    return ( 
        <div style={{color: tightConnectionColor}} className="transit-grid">{transitTime} Min. to change</div>
     );
}
 
export default SearchTransitInfo;