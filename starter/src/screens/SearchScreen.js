import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BooksGrid from "../components/BooksGrid";
import * as BooksAPI from "../utils/BooksAPI";

const SearchScreen = ({ books, onShelfChanged }) => {
    const [ query, setQuery ] = useState('');
    const [ searchedBooks, setSearchedBooks ] = useState([]);

    useEffect(() => {
        const search = setTimeout(async () => {
            if(query){
                const res = await BooksAPI.search(query, 20);
                
                if(res && Array.isArray(res)){
                    res.forEach(searchedBook => {
                        const book = books.find(book => book.id === searchedBook.id);
                        if(book){
                            searchedBook.shelf = book.shelf;
                        }
                    });
                    
                    setSearchedBooks(res.filter(book => book.imageLinks && book.imageLinks.thumbnail));
                }
                else{
                    setSearchedBooks([]);
                }
            }
            else{
                setSearchedBooks([]);
            }
        }, 200)
    
        return () => clearTimeout(search)
    }, [query, books])

    const updateQuery = (e) => {
        setQuery(e.target.value);
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
                <BooksGrid books={searchedBooks} onShelfChanged={onShelfChanged} />
            </div>
        </div>
    );
};

SearchScreen.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
}

export default SearchScreen;