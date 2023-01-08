import { v1 as uuid } from "uuid";
import patients from "../../data/patients";

import { PublicPatient, Patient, NewPatient, EntryWithoutId } from "../types";

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
    entries: [],
  };
  patients.push(newPatientEntry);
  console.log(newPatientEntry);
  console.log(patients);
  return newPatientEntry;
};

const updatePatientEntries = (id: string, entry: EntryWithoutId): Patient => {
  const generatedId: string = uuid();
  const patientToUpdate = patients.find((p) => {
    return p.id === id;
  });

  if (patientToUpdate === undefined) {
    throw new Error("Patient not found");
  }

  const newEntry = {
    id: generatedId,
    ...entry,
  };

  patientToUpdate.entries?.push(newEntry);
  return patientToUpdate;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  updatePatientEntries,
};
