import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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

  const handleShelfChanged = (bookId, newShelf) => {
    setBooks(books.map(book => book.id === bookId ? {...book, shelf: newShelf } : book ));
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
          <SearchScreen onShelfChanged={handleShelfChanged} />
        }/>
    </Routes>
  );
}

export default App;
