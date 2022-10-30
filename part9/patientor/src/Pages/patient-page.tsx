import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useEffect } from "react";
import { isString } from "formik";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  console.log(typeof patient?.id);
  console.log(typeof id);

  useEffect(() => {
    if (patient?.id !== id && isString(id)) {
      console.log("updating");
      void (async () => {
        try {
          const { data: fetchedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "SET_PATIENT", payload: fetchedPatient });
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
    </div>
  );
};

export default PatientPage;
