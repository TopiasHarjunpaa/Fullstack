import { CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
