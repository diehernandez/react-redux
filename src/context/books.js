import { createContext, useState } from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  // TODO: Create an axios instance & use env variables
  const baseUrl = 'https://ubiquitous-disco-9j9q4vxq4gx27gxw-3001.app.github.dev'
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, locale',
    'Access-Control-Allow-Methods': 'GET, POST',
  }
  const fetchBooks = async () => {
    const response = await axios.get(`${baseUrl}/books`,headers);

    setBooks(response.data);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`${baseUrl}/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`${baseUrl}/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post(`${baseUrl}/books`, {
      title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };
  const valueToShare = {
    books,
    createBook,
    editBookById,
    deleteBookById,
    fetchBooks
  }
  return <BooksContext.Provider value={valueToShare}>{children}</BooksContext.Provider>;
}

export { Provider };
export default BooksContext;
