import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";

const shelves = [ 
    { key: "currentlyReading", value: "Currently Reading" },
    { key: "wantToRead", value: "Want to Read" },
    { key: "read", value: "Read" }
];

const MainScreen = ({ books, onShelfChanged }) => {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
                {
                    shelves.map(shelf => 
                        <BookShelf
                            key={shelf.key}
                            id={shelf.key}
                            title={shelf.value}
                            booksInShelf={books.filter(book => book.shelf === shelf.key)}
                            onShelfChanged={onShelfChanged} />
                    )
                }
            </div>
          </div>
          <div className="open-search">
            <Link to="/search" className="open-search-link">Add a book</Link>
          </div>
        </div>
    );
};

MainScreen.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
}

export default MainScreen;