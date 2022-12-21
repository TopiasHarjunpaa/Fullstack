import { v1 as uuid } from "uuid";
import patients from "../../data/patients";

import { PublicPatient, Patient, NewPatient } from "../types";

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => {
    return p.id === id;
  });
};

const addPatient = (entry: NewPatient): Patient => {
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
  getPatient,
  addPatient,
};
