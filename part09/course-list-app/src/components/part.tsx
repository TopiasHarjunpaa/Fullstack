import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const ParseFields = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <i>project exercises {part.groupProjectCount}</i>
        </div>
      );
    case "submission":
      return (
        <div>
          <i>
            {part.description}
            <br />
          </i>
          <i>submit to https: {part.exerciseSubmissionLink}</i>
        </div>
      );
    case "special":
      return (
        <div>
          <i>
            {part.description}
            <br />
          </i>
          <i>required skills: {String(part.requirements)}</i>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  return (
    <div>
      <b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
      <ParseFields part={coursePart} />
      <br />
    </div>
  );
};

export default Part;
