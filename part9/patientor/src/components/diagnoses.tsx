import { useStateValue } from "../state";

const DiagnoseList = ({ diagnosisCodes }: { diagnosisCodes: string[] }) => {
  const [{ diagnosis }] = useStateValue();
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
