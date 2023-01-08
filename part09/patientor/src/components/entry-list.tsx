import { Entry } from "../types";
import EntryContainer from "./entry-container";

const EntryList = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      {<h3>{entries.length > 0 ? "Entries" : "No entries"}</h3>}
      {entries.map((entry) => (
        <tr key={entry.id}>
          <EntryContainer entry={entry} />
        </tr>
      ))}
    </div>
  );
};

export default EntryList;
