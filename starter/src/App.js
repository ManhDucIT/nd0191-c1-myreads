import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import MainScreen from "./screens/MainScreen";
import SearchScreen from "./screens/SearchScreen";

function App() {
  const [ books, setBooks ] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    }

    getAllBooks();
  }, []);

  const handleShelfChanged = async (bookId, newShelf) => {
    let isBookExisting = false;

    let updatedBooks = books.map(book => {
      if(book.id === bookId){
        book.shelf = newShelf;
        isBookExisting = true;
      }

      return book;
    });

    if(!isBookExisting){
      const res = await BooksAPI.get(bookId);
      updatedBooks = [...updatedBooks, { ...res, shelf: newShelf }];
    }
    
    setBooks(updatedBooks);
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <MainScreen books={books} onShelfChanged={handleShelfChanged} />
        }/>
      <Route
        path="/search"
        element={
          <SearchScreen books={books} onShelfChanged={handleShelfChanged} />
        }/>
    </Routes>
  );
}

export default App;
