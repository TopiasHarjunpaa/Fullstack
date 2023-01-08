import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE, FAVORITE_GENRE } from "../queries";

const FavoriteBooks = ({ show, token }) => {
  const result = useQuery(FAVORITE_GENRE);
  const genre = result.data?.me.favoriteGenre;
  const { data } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  if (!show) {
    return null;
  }

  if (!token) {
    return (
      <div>
        <h3>Login to see book recommendations</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre {genre}</p>
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
    </div>
  );
};

export default FavoriteBooks;
