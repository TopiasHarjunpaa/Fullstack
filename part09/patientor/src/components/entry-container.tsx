import { Entry, HealthCheckRating } from "../types";
import DiagnoseList from "./diagnoses";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealingIcon from "@mui/icons-material/Healing";
import VaccinesIcon from "@mui/icons-material/Vaccines";

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
          <h3>
            <LocalHospitalIcon /> Hospital
          </h3>
          <li>Date: {entry.date}</li>
          <li>Description: {entry.description}</li>
          <li>
            Discharge date: {entry.discharge.date} | Discharge criteria:{" "}
            {entry.discharge.criteria}
          </li>
          <li>Specialist: {entry.specialist}</li>
        </ul>
      );
    case "OccupationalHealthcare":
      return (
        <ul style={{ listStyle: "none" }}>
          <h3>
            <VaccinesIcon /> Occupational Healthcare
          </h3>
          <li>
            Date: {entry.date} | Employer: {entry.employerName}
          </li>
          <li>Description: {entry.description}</li>
          <li>
            {entry.sickLeave
              ? `Sickleave start date: ${entry.sickLeave?.startDate} | Sickleave end date: ${entry.sickLeave?.endDate}`
              : `Ǹo sickleave`}
          </li>
          <li>Specialist: {entry.specialist}</li>
        </ul>
      );
    case "HealthCheck":
      return (
        <ul style={{ listStyle: "none" }}>
          <h3>
            <HealingIcon /> Healthcheck
          </h3>
          <li>Date: {entry.date}</li>
          <li>Description: {entry.description}</li>
          <li>
            Healthcheck rating: {HealthCheckRating[entry.healthCheckRating]}
          </li>
          <li>Specialist: {entry.specialist}</li>
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
