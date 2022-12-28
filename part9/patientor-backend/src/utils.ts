import {
  NewPatient,
  Gender,
  HealthCheckRating,
  EntryWithoutId,
  Sickleave,
} from "./types";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error("Incorrect or missing comment");
  }
  return field;
};

const parseSickleave = (start: unknown, end: unknown): Sickleave | null => {
  if ((start === "" || end === "") && isString(start) && isString(end)) {
    return null;
  }
  const sickLeave: Sickleave = {
    startDate: parseField(start),
    endDate: parseField(end),
  };
  return sickLeave;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes) {
    return [];
  }

  if (Array.isArray(codes)) {
    if (codes.some((c) => !isString(c))) {
      throw new Error("Invalid error codes");
    }
  } else {
    throw new Error("Wrong input format");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !typeof healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      "Incorrect or missing health check rating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

type HealthCheckFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  healthCheckRating: unknown;
};

type HospitalFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  dischargeDate: unknown;
  dischargeCriteria: unknown;
};

type HealthcareFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  employerName: unknown;
  sickleaveStartDate: unknown;
  sickleaveEndDate: unknown;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseField(name),
    dateOfBirth: parseField(dateOfBirth),
    ssn: parseField(ssn),
    gender: parseGender(gender),
    occupation: parseField(occupation),
  };

  return newEntry;
};

export const toNewHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: HealthCheckFields): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    type: "HealthCheck",
    description: parseField(description),
    date: parseField(date),
    specialist: parseField(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  };
  return newEntry;
};

export const toNewHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  dischargeDate,
  dischargeCriteria,
}: HospitalFields): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    type: "Hospital",
    description: parseField(description),
    date: parseField(date),
    specialist: parseField(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    discharge: {
      date: parseField(dischargeDate),
      criteria: parseField(dischargeCriteria),
    },
  };
  return newEntry;
};

export const toNewHealthCareEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickleaveStartDate,
  sickleaveEndDate,
}: HealthcareFields): EntryWithoutId => {
  const sickLeave = parseSickleave(sickleaveStartDate, sickleaveEndDate);
  const newEntry: EntryWithoutId = {
    type: "OccupationalHealthcare",
    description: parseField(description),
    date: parseField(date),
    specialist: parseField(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    employerName: parseField(employerName),
  };

  if (sickLeave) {
    return {
      ...newEntry,
      sickLeave: sickLeave,
    };
  }

  return newEntry;
};
