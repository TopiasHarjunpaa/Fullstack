import { useSubscription, useApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import FavoriteBooks from "./components/FavoriteBooks";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const updateCache = (client, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  client.cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCache(client, { query: ALL_BOOKS }, addedBook);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("favorite")}>recommend</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>
      <Authors show={page === "authors"} setError={notify} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} token={token} />
      <FavoriteBooks show={page === "favorite"} token={token} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
