import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";

import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const BirthyearForm = ({ setError, authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [born, setBorn] = useState("");
  const authorOptions = authors
    ? authors.map((a) => ({
        value: a.name,
        label: a.name,
      }))
    : [];

  const [changeBirthyear, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(
        error.graphQLErrors[0]
          ? error.graphQLErrors[0].message
          : "Something went wrong"
      );
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    changeBirthyear({
      variables: { name: selectedAuthor?.value, setBornTo: born },
    });

    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Author not found");
    }
  }, [result.data]); // eslint-disable-line

  return (
    <div>
      <h2>Set birthyear</h2>

      <Select
        defaultValue={selectedAuthor}
        onChange={setSelectedAuthor}
        options={authorOptions}
      />

      <form onSubmit={submit}>
        <div>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default BirthyearForm;
