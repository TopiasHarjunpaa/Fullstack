import express from "express";
import patientService from "../services/patientService";
import {
  toNewPatientEntry,
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewHealthCareEntry,
  isString,
} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(patientService.getPatient(id));
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const type: unknown = req.body.type;
    const entryType = isString(type) ? type : "Invalid";
    const { id } = req.params;

    switch (entryType) {
      case "HealthCheck":
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newHealthCheckEntry = toNewHealthCheckEntry(req.body);
        const addedHealthCheckEntry = patientService.updatePatientEntries(
          id,
          newHealthCheckEntry
        );
        console.log("New HealthCheck entry added:");
        console.log(addedHealthCheckEntry);
        res.json(addedHealthCheckEntry);
        break;
      case "Hospital":
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newHospitalEntry = toNewHospitalEntry(req.body);
        const addedHospitalEntry = patientService.updatePatientEntries(
          id,
          newHospitalEntry
        );
        console.log("New Hospital entry added:");
        console.log(addedHospitalEntry);
        res.json(addedHospitalEntry);
        break;
      case "OccupationalHealthcare":
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newHealthcareEntry = toNewHealthCareEntry(req.body);
        const addedHealthcareEntry = patientService.updatePatientEntries(
          id,
          newHealthcareEntry
        );
        console.log("New Hospital entry added:");
        console.log(addedHealthcareEntry);
        res.json(addedHealthcareEntry);
        break;
      default:
        res.status(400).send("Invalid entry name");
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
