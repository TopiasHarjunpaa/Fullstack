import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddPatientForm, { PatientFormValues } from "./add-patient-form";
import AddHealthCheckEntryForm from "./add-healthcheck-entry-form";
import { EntryFormValues } from "../types";
import AddHospitalEntryForm from "./add-hospital-entry-form";
import AddHealthcareEntryForm from "./add-healthcare-entry-form";

interface PatientProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

interface EntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryType: string;
}

export const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: PatientProps) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  entryType,
}: EntryProps) => {
  switch (entryType) {
    case "Hospital":
      return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
          <DialogTitle>Add a new hospital entry</DialogTitle>
          <Divider />
          <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </DialogContent>
        </Dialog>
      );
    case "OccupationalHealthcare":
      return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
          <DialogTitle>Add a new occupational healthcare entry</DialogTitle>
          <Divider />
          <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </DialogContent>
        </Dialog>
      );
    case "HealthCheck":
      return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
          <DialogTitle>Add a new health check entry</DialogTitle>
          <Divider />
          <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </DialogContent>
        </Dialog>
      );
    default:
      return <div />;
  }
};
