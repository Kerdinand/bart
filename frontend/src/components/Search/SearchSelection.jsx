const SearchSelection = () => {
    return ( 
        <div className="selection">
			<select name="origin" id="origin">
				<option>Choose a Origin</option>
			</select>
			<p id="switch">
				<ion-icon
					name="swap-horizontal-outline"
					class="icon"
				></ion-icon>
			</p>
			<select name="destination" id="destination">
				<option>Choose a Destination</option>
			</select>
			<div>
				<div className="calendar" id="open-cal">
					<ion-icon name="calendar-outline"></ion-icon>
				</div>
				<button type="submit" id="search">Search</button>
				<div className="later-dep">
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>
				<div className="earlier-dep">
					<ion-icon name="chevron-up-outline"></ion-icon>
				</div>
			</div>
		</div>

     );
}
 
export default SearchSelection;