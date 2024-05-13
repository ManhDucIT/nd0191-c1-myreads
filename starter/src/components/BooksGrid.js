import { useState } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const BooksGrid = ({ books, onShelfChanged }) => {
    return (
        <ol className="books-grid">
            {
                books && books.map(book => 
                    <li key={book.id}>
                        <Book
                            id={book.id}
                            thumbnail={book.imageLinks.thumbnail}
                            title={book.title}
                            authors={book.authors}
                            shelf={book.shelf}
                            onShelfChanged={onShelfChanged} />
                    </li>
                )
            }
        </ol>
    );
};

BooksGrid.propTypes = {
    books: PropTypes.array,
    onShelfChanged: PropTypes.func.isRequired
}

export default BooksGrid;