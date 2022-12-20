const DiagnoseList = ({ diagnosisCodes }: { diagnosisCodes: string[] }) => {
  return (
    <div>
      {diagnosisCodes.map((code, index) => (
        <tr key={index}>
          <li>{code} </li>
        </tr>
      ))}
    </div>
  );
};

export default DiagnoseList;
