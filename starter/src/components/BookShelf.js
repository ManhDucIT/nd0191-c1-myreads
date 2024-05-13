import { useState } from "react";
import PropTypes from "prop-types";
import BooksGrid from "./BooksGrid";

const BookShelf = ({ title, booksInShelf, onShelfChanged }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <BooksGrid books={booksInShelf} onShelfChanged={onShelfChanged} />
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    booksInShelf: PropTypes.array.isRequired
}

export default BookShelf;