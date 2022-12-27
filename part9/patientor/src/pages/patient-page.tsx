import React from "react";
import axios from "axios";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient, EntryFormValues } from "../types";
import { useEffect } from "react";
import { isString } from "formik";
import EntryList from "../components/entry-list";
import { AddEntryModal } from "../modals";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [entryTypeValue, setEntryTypeValue] = React.useState("HealthCheck");

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    if (patient?.id !== id && isString(id)) {
      void (async () => {
        try {
          const { data: fetchedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(fetchedPatient));
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
          }
        }
      })();
    }
  }, []);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id !== undefined) {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(setPatient(updatedPatient));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryTypeValue((event.target as HTMLInputElement).value);
  };

  if (id === undefined) {
    return (
      <div>
        <h3>Patient not found</h3>
      </div>
    );
  }
  return (
    <div>
      <h3>{patient?.name}</h3>
      <i>
        ssh: {patient?.ssn}
        <br />
      </i>
      <i>
        occupation: {patient?.occupation}
        <br />
      </i>
      {patient?.entries ? <EntryList entries={patient.entries} /> : <div />}

      <FormControl>
        <FormLabel id="entry-type-buttons-group">Entry type</FormLabel>
        <RadioGroup
          aria-labelledby="entry-type-buttons-group"
          name="radio-buttons-group"
          value={entryTypeValue}
          onChange={handleChange}
        >
          <FormControlLabel
            value="HealthCheck"
            control={<Radio />}
            label="Healthcheck"
          />
          <FormControlLabel
            value="Hospital"
            control={<Radio />}
            label="Hospital"
          />
          <FormControlLabel
            value="OccupationalHealthcare"
            control={<Radio />}
            label="Healthcare"
          />
        </RadioGroup>
      </FormControl>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        entryType={entryTypeValue}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New {entryTypeValue} Entry
      </Button>
    </div>
  );
};

export default PatientPage;
