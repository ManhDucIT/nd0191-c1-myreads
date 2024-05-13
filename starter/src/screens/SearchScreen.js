import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BooksGrid from "../components/BooksGrid";
import * as BooksAPI from "../utils/BooksAPI";

const SearchScreen = ({ onShelfChanged }) => {
    const [ query, setQuery ] = useState('');
    const [ books, setBooks ] = useState([]);

    useEffect(() => {
        const search = setTimeout(async () => {
            if(query){
                const res = await BooksAPI.search(query, 100);
                setBooks(res);
            }
        }, 200)
    
        return () => clearTimeout(search)
    }, [query])

    const updateQuery = (e) => {
        setQuery(e.target.value.trim());
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={updateQuery}/>
                </div>
            </div>
            <div className="search-books-results">
                <BooksGrid books={books} onShelfChanged={onShelfChanged} />
            </div>
        </div>
    );
};

SearchScreen.propTypes = {
    onShelfChanged: PropTypes.func.isRequired
}

export default SearchScreen;