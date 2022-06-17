import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({ setLocationHandler}) {
    const [query, setQuery] = useState('');
    function onFormSubmit(e) {
        e.preventDefault();
        console.log('submitted');
        setLocationHandler(query);

    }
    return (
        <form className="searchbar" onSubmit={onFormSubmit}>
            <input
                type="text"
                name="search"
                placeholder="Zoek naar producten"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit">
                Zoek
            </button>
        </form>
    );
}

export default SearchBar;