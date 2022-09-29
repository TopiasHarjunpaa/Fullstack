import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const sortByVotes = (anecdotes) => {
  anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  });
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  sortByVotes(anecdotes);
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
