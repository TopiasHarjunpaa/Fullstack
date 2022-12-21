import { useStateValue } from "../state";

const DiagnoseList = ({ diagnosisCodes }: { diagnosisCodes: string[] }) => {
  const [{ diagnosis }] = useStateValue();
  console.log(diagnosis["F43.2"]);
  console.log("test");
  return (
    <div>
      {diagnosisCodes.map((code, index) => (
        <tr key={index}>
          <td>
            {diagnosis[code]?.code} {diagnosis[code]?.name}
          </td>
        </tr>
      ))}
    </div>
  );
};

export default DiagnoseList;
