import { connect } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    const filteredInput = event.target.value;
    props.filterAnecdotes(filteredInput);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filterAnecdotes })(Filter);
