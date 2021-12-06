import SearchSelection from './SearchSelection';

import './search.style.css'

const Search = () => {
    return (
        <div>
            <div className="search">
                <SearchSelection></SearchSelection>
            </div>
            <h3>Proposed Routes:</h3>
        </div>
        
 );
}
 
export default Search;