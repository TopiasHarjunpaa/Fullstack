import { v1 as uuid } from "uuid";
import patients from "../../data/patients";

import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from "../types";

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const generatedId: string = uuid();
  const newPatientEntry = {
    id: generatedId,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
};
