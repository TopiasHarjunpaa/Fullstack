import { Entry } from "../types";
import DiagnoseList from "./diagnoses";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <ul style={{ listStyle: "none" }}>
          <li>{entry.date} Hosp-logo</li>
          <li>{entry.description}</li>
          <li>
            {entry.discharge.date} {entry.discharge.criteria}
          </li>
          <li>{entry.specialist}</li>
        </ul>
      );
    case "OccupationalHealthcare":
      return (
        <ul style={{ listStyle: "none" }}>
          <li>
            {entry.date} Occu-logo {entry.employerName}
          </li>
          <li>{entry.description}</li>
          <li>{entry.specialist}</li>
        </ul>
      );
    case "HealthCheck":
      return (
        <ul style={{ listStyle: "none" }}>
          <li>{entry.date} HealthCheck-logo</li>
          <li>{entry.description}</li>
          <li>{entry.healthCheckRating}</li>
          <li>{entry.specialist}</li>
        </ul>
      );
    default:
      return assertNever(entry);
  }
};

const EntryContainer = ({ entry }: { entry: Entry }) => {
  return (
    <div className="entry">
      <EntryDetails entry={entry} />
      {entry.diagnosisCodes ? (
        <DiagnoseList diagnosisCodes={entry.diagnosisCodes} />
      ) : (
        <div />
      )}
    </div>
  );
};

export default EntryContainer;
