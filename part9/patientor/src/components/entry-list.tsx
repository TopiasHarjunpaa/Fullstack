import { Entry } from "../types";
import DiagnoseList from "./diagnoses";

const EntryList = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      {<h3>{entries.length > 0 ? "Entries" : "No entries"}</h3>}
      {entries.map((entry) => (
        <tr key={entry.id}>
          <i>{entry.date} </i>
          <i>{entry.description}</i>
          {entry.diagnosisCodes ? (
            <DiagnoseList diagnosisCodes={entry.diagnosisCodes} />
          ) : (
            <div />
          )}
        </tr>
      ))}
    </div>
  );
};

export default EntryList;
