import { useState } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "../utils/BooksAPI";

const Book = ({ id, thumbnail, title, authors, shelf, onShelfChanged }) => {
    const [ selectedShelf, setSelectedShelf ] = useState(shelf ? shelf : "default");

    const handleShelfChanged = async (e) => {
        const newShelf = e.target.value;

        setSelectedShelf(newShelf);

        await BooksAPI.update(id, newShelf);

        onShelfChanged(id, newShelf);
    };

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${thumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={selectedShelf} onChange={handleShelfChanged}>
                        <option value="default" disabled>{ selectedShelf ? "Move to..." : "Add to..." }</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        { selectedShelf && <option value="none">None</option> }
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">
                {
                    authors && authors.map((author, index) => 
                        <p key={index}>{author}</p>
                    )
                }
            </div>
        </div>
    );
};

Book.propTypes = {
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string
}

export default Book;