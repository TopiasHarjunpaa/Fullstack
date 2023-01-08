import { CoursePart } from "../types";
import Part from "./part";

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <tr key={index}>
          <Part coursePart={part} />
        </tr>
      ))}
    </div>
  );
};

export default Content;
