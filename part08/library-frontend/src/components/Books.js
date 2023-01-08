import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const getGenreTypes = (allBooks) => {
  const genres = new Set();
  allBooks?.map((b) => b.genres.map((g) => genres.add(g)));
  genres.add("all genres");
  return genres;
};

const Books = ({ show }) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS);
  const { data } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  const handleClick = (event) => {
    setGenre(event.target.value);
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...getGenreTypes(result.data?.allBooks)].map((g) => (
        <button
          key={g}
          value={g === "all genres" ? "" : g}
          onClick={handleClick}
        >
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
